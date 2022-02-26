server.post('/api/host/image', (req, res) => {
  if (!req.session.passport) {
    res.writeHead(403, {
      'Content-Type': 'application/json',
    })
    res.end(
      JSON.stringify({
        status: 'error',
        message: 'Unauthorized',
      })
    )

    return
  }

  const image = req.files.image
  const fileName = randomstring.generate(7) + image.name.replace(/\s/g, '')
  const path = __dirname + '/public/img/' + fileName

  image.mv(path, (error) => {
    if (error) {
      console.error(error)
      res.writeHead(500, {
        'Content-Type': 'application/json',
      })
      res.end(JSON.stringify({ status: 'error', message: error }))
      return
    }

    res.writeHead(200, {
      'Content-Type': 'application/json',
    })
    res.end(JSON.stringify({ status: 'success', path: '/img/' + fileName }))
  })
})