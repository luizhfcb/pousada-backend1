const test = require('node:test')
const assert = require('node:assert/strict')

const { createResponse } = require('./helpers/httpMocks')
const requireAdmin = require('../middlewares/requireAdmin')

test('requireAdmin blocks non-admin users', () => {
  const req = {
    usuario: {
      id: 'user-1',
      cargo: 'recepcionista',
    },
  }
  const res = createResponse()
  let nextCalled = false

  requireAdmin(req, res, () => {
    nextCalled = true
  })

  assert.equal(nextCalled, false)
  assert.equal(res.statusCode, 403)
  assert.deepEqual(res.body, { erro: 'Acesso restrito a administradores.' })
})

test('requireAdmin allows admin users', () => {
  const req = {
    usuario: {
      id: 'user-2',
      cargo: 'admin',
    },
  }
  const res = createResponse()
  let nextCalled = false

  requireAdmin(req, res, () => {
    nextCalled = true
  })

  assert.equal(nextCalled, true)
  assert.equal(res.statusCode, 200)
})
