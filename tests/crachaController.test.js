const test = require('node:test')
const assert = require('node:assert/strict')

const { createResponse } = require('./helpers/httpMocks')
const Cracha = require('../models/Cracha')
const crachaController = require('../controllers/crachaController')

test.afterEach(() => {
  Cracha.find = undefined
})

test('listarCrachas returns emitted badges with employee data', async () => {
  Cracha.find = () => ({
    populate: () => ({
      sort: async () => [
        {
          _id: 'badge-1',
          codigoRfid: 'RF-001',
          usuario: {
            _id: 'user-1',
            nome: 'Ana',
            cargo: 'admin',
          },
        },
      ],
    }),
  })

  const req = {}
  const res = createResponse()

  await crachaController.listarCrachas(req, res)

  assert.equal(res.statusCode, 200)
  assert.equal(res.body.length, 1)
  assert.equal(res.body[0].codigoRfid, 'RF-001')
  assert.equal(res.body[0].usuario.nome, 'Ana')
})
