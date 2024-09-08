const request = require("supertest");
const app = require("../app");
const { User, Hero, Favourite, sequelize } = require("../models");
const { generateToken } = require("../helpers/jwt");
const { queryInterface } = sequelize;

let validToken, validToken2, invalidToken, idFavourite;
const userTest1 = {
  email: "user.test1@mail.com",
  password: "usertest1",
};

const userTest2 = {
  email: "user.test2@mail.com",
  password: "usertest2",
};

beforeAll((done) => {
  User.create(userTest1)
    .then((registeredUser) => {
      validToken = generateToken({
        id: registeredUser.id,
        email: registeredUser.email,
      });
      invalidToken =
        "123456789eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9";
      return User.create(userTest2);
    })
    .then((registeredUser2) => {
      validToken2 = generateToken({
        id: registeredUser2.id,
        email: registeredUser2.email,
      });
      return queryInterface.bulkInsert(
        'Heros',
        [
          {
            "name": "Paquito",
            "type": "Fighter",
            "imageUrl": "https://img.mobilelegends.com/group1/M00/00/B2/Cq2IxmAKtDOAe9QQAAIoQFvuZwA933.jpg",
            "createdAt": new Date(),
            "updatedAt": new Date()
          },
          {
            "name": "Barats",
            "type": "Tank",
            "imageUrl": "https://img.mobilelegends.com/group1/M00/00/AB/Cq2Ixl-_iUCAQOs3AALNya38dwM674.jpg",
            "createdAt": new Date(),
            "updatedAt": new Date()
          },
          {
            "name": "Yu Zhong",
            "type": "Fighter",
            "imageUrl": "https://img.mobilelegends.com/group1/M00/00/A8/Cq2Ixl8MDzOAYTdJAAGJKaZhxlA426.jpg",
            "createdAt": new Date(),
            "updatedAt": new Date()
          }
        ],
        {}
      );
    })
    .then(() => {
      done();
    })
    .catch((err) => {
      done(err);
    });
});

afterAll(done => {
  User.destroy({ truncate: true, cascade: true, restartIdentity: true })
    .then(_ => {
      return Hero.destroy({ truncate: true, cascade: true, restartIdentity: true })
    })
    .then(_ => {
      return Favourite.destroy({ truncate: true, cascade: true, restartIdentity: true })
    })
    .then(_ => {
      done();
    })
    .catch(err => {
      done(err);
    });
});

describe("GET /heroes", () => {
  test("200 success get heroes", (done) => {
    request(app)
      .get("/heroes")
      .set('Authorization', `Bearer ${validToken}`)
      .then((response) => {
        const { body, status } = response;

        expect(status).toBe(200);
        expect(Array.isArray(body)).toBeTruthy();
        expect(body.length).toBeGreaterThan(0);
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  test("401 get heroes with invalid token", (done) => {
    request(app)
      .get("/heroes")
      .set('Authorization', `Bearer ${invalidToken}`)
      .then((response) => {
        const { body, status } = response;

        expect(status).toBe(401);
        expect(body).toHaveProperty("message", "Invalid token");
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  test("401 get heroes without token", (done) => {
    request(app)
      .get("/heroes")
      .then((response) => {
        const { body, status } = response;

        expect(status).toBe(401);
        expect(body).toHaveProperty("message", "Invalid token");
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
});

describe("POST /favourites/:heroId", () => {
  test("201 success POST favourites", (done) => {
    request(app)
      .post(`/favourites/1`)
      .set('Authorization', `Bearer ${validToken}`)
      .then((response) => {
        const { body, status } = response;

        expect(status).toBe(201);
        expect(body).toHaveProperty("id", expect.any(Number));
        expect(body).toHaveProperty("heroId", 1);
        expect(body).toHaveProperty("userId", expect.any(Number));
        expect(body).toHaveProperty("role", "-");
        expect(body).toHaveProperty("power", 0);
        idFavourite = body.id;
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  test("401 POST selected hero with invalid token", (done) => {
    request(app)
      .post(`/favourites/1`)
      .set('Authorization', `Bearer ${invalidToken}`)
      .then((response) => {
        const { body, status } = response;

        expect(status).toBe(401);
        expect(body).toHaveProperty("message", "Invalid token");
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  test("401 POST selected hero without token", (done) => {
    request(app)
      .post(`/favourites/1`)
      .then((response) => {
        const { body, status } = response;

        expect(status).toBe(401);
        expect(body).toHaveProperty("message", "Invalid token");
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  test("404 POST selected hero not found", (done) => {
    request(app)
      .post(`/favourites/99`)
      .set('Authorization', `Bearer ${validToken}`)
      .then((response) => {
        const { body, status } = response;

        expect(status).toBe(404);
        expect(body).toHaveProperty("message", "Hero not found");
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
});

describe("GET /favourites", () => {
  test("200 success get all selected heroes", (done) => {
    request(app)
      .get("/favourites")
      .set('Authorization', `Bearer ${validToken}`)
      .then((response) => {
        const { body, status } = response;

        expect(status).toBe(200);
        expect(Array.isArray(body)).toBeTruthy();
        expect(body.length).toBeGreaterThan(0);
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  test("401 get selected heroes with invalid token", (done) => {
    request(app)
      .get("/favourites")
      .set("access_token", invalidToken)
      .then((response) => {
        const { body, status } = response;

        expect(status).toBe(401);
        expect(body).toHaveProperty("message", "Invalid token");
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  test("401 get selected heroes without token", (done) => {
    request(app)
      .get("/favourites")
      .then((response) => {
        const { body, status } = response;

        expect(status).toBe(401);
        expect(body).toHaveProperty("message", "Invalid token");
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
});

describe("PUT /favourites/:id", () => {
  test("200 success update selected hero", (done) => {
    request(app)
      .put(`/favourites/${idFavourite}`)
      .set('Authorization', `Bearer ${validToken}`)
      .send({
        role: 'Jungler',
        power: 3000
      })
      .then((response) => {
        const { body, status } = response;

        expect(status).toBe(200);
        expect(body).toHaveProperty("message", "Hero has been updated");
        done();
      })
      .catch((err) => {
        done(err);
      });
  });


  test("403 update selected hero with unauthorized user", (done) => {
    request(app)
      .put(`/favourites/${idFavourite}`)
      .set('Authorization', `Bearer ${validToken2}`)
      .then((response) => {
        const { body, status } = response;

        expect(status).toBe(403);
        expect(body).toHaveProperty("message", "You are not authorized");
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  test("401 update selected hero with invalid token", (done) => {
    request(app)
      .put(`/favourites/${idFavourite}`)
      .set('Authorization', `Bearer ${invalidToken}`)
      .then((response) => {
        const { body, status } = response;

        expect(status).toBe(401);
        expect(body).toHaveProperty("message", "Invalid token");
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  test("401 update selected hero without token", (done) => {
    request(app)
      .put(`/favourites/${idFavourite}`)
      .then((response) => {
        const { body, status } = response;

        expect(status).toBe(401);
        expect(body).toHaveProperty("message", "Invalid token");
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  test("404 update selected hero not found", (done) => {
    request(app)
      .put(`/favourites/99`)
      .set('Authorization', `Bearer ${validToken}`)
      .then((response) => {
        const { body, status } = response;

        expect(status).toBe(404);
        expect(body).toHaveProperty("message", "Hero not found");
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
});
