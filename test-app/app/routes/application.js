import Route from '@ember/routing/route';

export default class ApplicationRoute extends Route {
  model() {
    return [
      {
        id: 1,
        parentId: null,
        name: 'Root',
      },
      {
        id: 2,
        parentId: 1,
        name: 'First Child',
      },
      {
        id: 3,
        parentId: 1,
        name: 'Second Child',
      },
      {
        id: 4,
        parentId: 3,
        name: 'Grand Child',
      },
    ];
  }
}
