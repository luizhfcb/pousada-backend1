const test = require('node:test')
const assert = require('node:assert/strict')
const bcrypt = require('bcryptjs')

const { createResponse } = require('./helpers/httpMocks')
const Usuario = require('../models/Usuario')
const Cracha = require('../models/Cracha')
const authController = require('../controllers/authController')

test.afterEach(() => {
  Usuario.findOne = undefined
  Usuario.prototype.save = undefined
  Usuario.find = undefined
  Usuario.findByIdAndUpdate = undefined
  Usuario.findByIdAndDelete = undefined
  Cracha.deleteOne = undefined
})

test('criarUsuario creates a new employee with hashed password', async () => {
  let savedUser = null

  Usuario.findOne = async () => null
  Usuario.prototype.save = async function save() {
    this._id = 'user-10'
    savedUser = this
  }

  const req = {
    body: {
      nome: 'Maria',
      email: 'maria@pousada.com',
      senha: '123456',
      cargo: 'limpeza',
    },
  }
  const res = createResponse()

  await authController.criarUsuario(req, res)

  assert.equal(res.statusCode, 201)
  assert.equal(res.body.usuario.nome, 'Maria')
  assert.equal(res.body.usuario.email, 'maria@pousada.com')
  assert.equal(res.body.usuario.cargo, 'limpeza')
  assert.ok(savedUser)
  assert.notEqual(savedUser.senha, '123456')
  assert.equal(await bcrypt.compare('123456', savedUser.senha), true)
})

test('atualizarUsuario updates editable employee fields without exposing password', async () => {
  Usuario.findByIdAndUpdate = async (_id, payload) => ({
    _id: 'user-20',
    nome: payload.nome,
    email: payload.email,
    cargo: payload.cargo,
    senha: 'hash',
  })

  const req = {
    params: { id: 'user-20' },
    body: {
      nome: 'Carlos',
      email: 'carlos@pousada.com',
      cargo: 'manutencao',
    },
  }
  const res = createResponse()

  await authController.atualizarUsuario(req, res)

  assert.equal(res.statusCode, 200)
  assert.equal(res.body.usuario.nome, 'Carlos')
  assert.equal(res.body.usuario.email, 'carlos@pousada.com')
  assert.equal(res.body.usuario.cargo, 'manutencao')
  assert.equal('senha' in res.body.usuario, false)
})

test('deletarUsuario removes employee and linked badge', async () => {
  Usuario.findByIdAndDelete = async () => ({
    _id: 'user-30',
    nome: 'Lucia',
  })

  let deletedBadgeFilter = null
  Cracha.deleteOne = async (filter) => {
    deletedBadgeFilter = filter
  }

  const req = {
    params: { id: 'user-30' },
  }
  const res = createResponse()

  await authController.deletarUsuario(req, res)

  assert.equal(res.statusCode, 200)
  assert.deepEqual(deletedBadgeFilter, { usuario: 'user-30' })
  assert.deepEqual(res.body, { mensagem: 'Funcionário removido com sucesso!' })
})
