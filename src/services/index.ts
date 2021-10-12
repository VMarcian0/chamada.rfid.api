import { Application } from '../declarations';
import users from './users/users.service';
import courses from './courses/courses.service';
import classrooms from './classrooms/classrooms.service';
import frequency from './frequency/frequency.service';
// Don't remove this comment. It's needed to format import lines nicely.

export default function (app: Application): void {
  app.configure(users);
  app.configure(courses);
  app.configure(classrooms);
  app.configure(frequency);
}
