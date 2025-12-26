import { faker } from "@faker-js/faker";

export default class User {
  private firstname: string;
  private lastname: string;
  private email: string;
  private password: string;
  private accessToken: string

  constructor() {
    this.firstname = faker.person.firstName();
    this.lastname = faker.person.lastName();
    this.email = faker.internet.email();
    this.password = "Test1234";
  }

  getFirstName() {
    return this.firstname;
  }
  getLastName() {
    return this.lastname;
  }
  getEmail() {
    return this.email;
  }
  getPassword() {
    return this.password;
  }
  getaccessToken() {
    return this.accessToken
  }
  setgetaccessToken(accessToken: string) {
    this.accessToken = accessToken;
  }
}
