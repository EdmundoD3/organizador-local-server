const request = require('supertest')
const app = require('../src/app')

describe("notes",()=>{
  let data;
  test('Post: Respond with a 200 status code', async () => {
    const response = await request(app).post("/api/notes/note").send({title:"titulo improvisado", content:"contenido improvisado"});
    data =  JSON.parse(response.text)
    expect(response.statusCode).toBe(200);
  })
  test('Get-by-id:Respond with a 200 status code', async () => {
    const dataId =  data.data[0].id
    const response = await request(app).get(`/api/notes/note/${dataId}`).send();
    expect(response.statusCode).toBe(200);
  })

  test('Respond with a 200 status code', async () => {
    const dataTitle = data.data[0].title
    const response = await request(app).get(`/api/notes/note/`).send({title:dataTitle});
    expect(response.statusCode).toBe(200);
  })
  test('Respond with a 200 status code', async () => {
    const response = await request(app).get(`/api/notes/notes`).send();
    expect(response.statusCode).toBe(200);
  })
  test('Respond with a 200 status code', async () => {
    const dataId = data.data[0].id
    const response = await request(app).put(`/api/notes/note/`).send({id:dataId, title:'new title', content:'new content'});
    expect(response.statusCode).toBe(200);
  })
  test('Respond with a 200 status code', async () => {
    const dataId = data.data[0].id
    const response = await request(app).delete(`/api/notes/note/`).send({id:dataId});
    expect(response.statusCode).toBe(200);
  })
  // after delete
  test('Get-by-id:Respond with a 400 status code', async () => {
    const dataId =  data.data[0].id
    const response = await request(app).get(`/api/notes/note/${dataId}`).send();
    expect(response.statusCode).toBe(400);
  })
  test('Get-by-id send:Respond with a 400 status code', async () => {
    const dataId = data.data[0].id
    const response = await request(app).get(`/api/notes/note`).send({id:dataId});
    expect(response.statusCode).toBe(400);
  })
  test('Respond with a 200 status code', async () => {
    const dataTitle = data.data[0].title
    const response = await request(app).get(`/api/notes/note/`).send({title:dataTitle});
    expect(response.statusCode).toBe(200);
  })
  test('Put: Respond with a 404 status code', async () => {
    const dataId = data.data[0].id
    const response = await request(app).put(`/api/notes/note/`).send({id:dataId, title:'new title', content:'new content'});
    expect(response.statusCode).toBe(404);
  })
})

