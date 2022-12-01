import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import App from '../app';

chai.use(chaiHttp);

const { app } = new App();

const { expect } = chai;

describe('Testes para a rota /matches', () => {
  
    describe('Usando o método GET em /matches', function () {

        it('Retorna a lista completa de matches!', async function () {
            const response = await chai
                .request(app)
                .get('/matches');

                expect(response.status).to.be.equals(200);
                expect(response.body).to.be.an('array')
        });

        it('Retorna a lista de matches com o filtro inProgress true!', async function () {
            const response = await chai
                .request(app)
                .get('/matches?inProgress=true');

                expect(response.status).to.be.equals(200);
                expect(response.body).to.be.an('array')
                expect(response.body[0].inProgress).to.be.deep.equals(true)
        });

        it('Retorna a lista de matches com o filtro inProgress false!', async function () {
            const response = await chai
                .request(app)
                .get('/matches?inProgress=false');

                expect(response.status).to.be.equals(200);
                expect(response.body).to.be.an('array')
                expect(response.body[0].inProgress).to.be.deep.equals(false)
        });
    });

    describe('Usando o método POST em /matches', function () {

        it('Se é possível criar uma partida com sucesso!', async function () {
            const response = await chai
                .request(app)
                .post('/login')
                .send({ email: 'admin@admin.com', password: 'secret_admin' });

                const responseMatch = await chai
                .request(app)
                .post('/matches')
                .set('authorization', response.body.token)
                .send({
                    homeTeam: 16,
                    awayTeam: 8,
                    homeTeamGoals: 2,
                    awayTeamGoals: 2
                  });
                
                // criado com sucesso
                expect(responseMatch.status).to.be.equals(201);
                // checa se o retorno é um objeto
                expect(responseMatch.body).to.be.an('object')
        });

        it('Se é possível criar uma partida com dados invalidos!', async function () {
            const response = await chai
                .request(app)
                .post('/login')
                .send({ email: 'admin@admin.com', password: 'secret_admin' });

                const responseMatch = await chai
                .request(app)
                .post('/matches')
                .set('authorization', response.body.token)
                .send({
                    homeTeam: 16,
                    homeTeamGoals: '2',
                    awayTeamGoals: 2
                  });
                  
                // espera que retorno seja 404
                expect(responseMatch.status).to.be.equals(404);
                // checa se o retorno é um objeto
                expect(responseMatch.body).to.be.an('object')
        });
    });

    it('Se é possível criar uma partida com token invalido', async function () {
        const fakeToken = 'eyJhbGciOiJIUzI1NiIsInR5cCVANILLAICECREAM6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGFkbWluLmNvbSIsImlhdCI6MTY2OTkxMjU0NCwiZXhwIjoxNjY5OTk4OTQ0fQ.r18bU6A_GQxJa6TIWWrX10s6hsYNKJWy2W2Pk4XFiGI'

            const responseMatch = await chai
            .request(app)
            .post('/matches')
            .set('authorization', fakeToken)
            .send({
                homeTeam: 16,
                awayTeam: 8,
                homeTeamGoals: 2,
                awayTeamGoals: 2
              });

            // espera que retorno seja 404
            expect(responseMatch.status).to.be.equals(401);
            // checa se o retorno é um objeto
            expect(responseMatch.body).to.be.an('object')
            expect(responseMatch.body.message).to.be.equal('Token must be a valid token')
            
    });

    it('Não deve ser possível criar partidas com id do times iguais', async function () {
        const response = await chai
                .request(app)
                .post('/login')
                .send({ email: 'admin@admin.com', password: 'secret_admin' });

            const responseMatch = await chai
            .request(app)
            .post('/matches')
            .set('authorization', response.body.token)
            .send({
                homeTeam: 16, // id do time
                awayTeam: 16, // id do time
                homeTeamGoals: 2,
                awayTeamGoals: 2
              });
              
            // espera que retorno seja 404
            expect(responseMatch.status).to.be.equals(422);
            // checa se o retorno é um objeto
            expect(responseMatch.body).to.be.an('object')
            expect(responseMatch.body.message).to.be.equal('It is not possible to create a match with two equal teams')
    });

    describe('Usando o método PATCH em /:id/finish', function () {

        it('Se é possível terminar uma partida com sucesso!', async function () {
                const responseMatch = await chai
                .request(app)
                .patch('/matches/45/finish')
                
                expect(responseMatch.status).to.be.equals(200);
                expect(responseMatch.body.message).to.be.equal('Finished')
        });
    });

    describe('Usando o método PATCH em /:id', function () {

        it('Se é possível alterar placar com sucesso', async function () {
                const responseMatch = await chai
                .request(app)
                .patch('/matches/2')
                .send({
                    homeTeamGoals: 3, // numero de gols
                    awayTeamGoals: 1 // numero de gols
                });
                
                expect(responseMatch.status).to.be.equals(200);
                expect(responseMatch.body).to.contain({ homeTeamGoals: 3 })
                expect(responseMatch.body).to.contain({ awayTeamGoals: 1 })
        });
    });
});
