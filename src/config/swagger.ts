export const swaggerDocument = {
  openapi: '3.0.0',
  info: {
    title: 'CRM API',
    version: '1.0.0',
    description: 'API документация для CRM проекта',
  },
  servers: [{ url: 'http://localhost:5000' }],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
    },
    schemas: {
      User: {
        type: 'object',
        properties: {
          id: { type: 'integer' },
          name: { type: 'string' },
          email: { type: 'string' },
          role: { type: 'string', enum: ['user', 'admin'] },
          createdAt: { type: 'string', format: 'date-time' },
        },
      },
      Product: {
        type: 'object',
        properties: {
          id: { type: 'integer' },
          name: { type: 'string' },
          price: { type: 'number' },
          createdAt: { type: 'string', format: 'date-time' },
        },
      },
      Order: {
        type: 'object',
        properties: {
          id: { type: 'integer' },
          userId: { type: 'integer' },
          createdAt: { type: 'string', format: 'date-time' },
          products: {
            type: 'array',
            items: { type: 'object' },
          },
        },
      },
      Error: {
        type: 'object',
        properties: {
          success: { type: 'boolean', example: false },
          message: { type: 'string' },
        },
      },
    },
  },
  paths: {
    '/auth/signup': {
      post: {
        tags: ['Auth'],
        summary: 'Регистрация',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['name', 'email', 'password'],
                properties: {
                  name: { type: 'string', example: 'John Doe' },
                  email: { type: 'string', example: 'john@test.com' },
                  password: { type: 'string', example: '123456' },
                },
              },
            },
          },
        },
        responses: {
          201: { description: 'Пользователь создан' },
          409: { description: 'Email уже занят' },
        },
      },
    },
    '/auth/login': {
      post: {
        tags: ['Auth'],
        summary: 'Вход',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['email', 'password'],
                properties: {
                  email: { type: 'string', example: 'john@test.com' },
                  password: { type: 'string', example: '123456' },
                },
              },
            },
          },
        },
        responses: {
          200: { description: 'Возвращает accessToken и refreshToken' },
          401: { description: 'Неверные credentials' },
        },
      },
    },
    '/auth/logout': {
      post: {
        tags: ['Auth'],
        summary: 'Выход',
        security: [{ bearerAuth: [] }],
        responses: {
          200: { description: 'Успешный выход' },
          401: { description: 'Не авторизован' },
        },
      },
    },
    '/auth/refresh': {
      post: {
        tags: ['Auth'],
        summary: 'Обновить access token',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  refreshToken: { type: 'string' },
                },
              },
            },
          },
        },
        responses: {
          200: { description: 'Новый accessToken' },
          401: { description: 'Невалидный refresh token' },
        },
      },
    },
    '/products': {
      get: {
        tags: ['Products'],
        summary: 'Список продуктов',
        security: [{ bearerAuth: [] }],
        responses: {
          200: { description: 'Список продуктов' },
          401: { description: 'Не авторизован' },
        },
      },
      post: {
        tags: ['Products'],
        summary: 'Создать продукт (admin)',
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['name', 'price'],
                properties: {
                  name: { type: 'string', example: 'Laptop' },
                  price: { type: 'number', example: 1200 },
                },
              },
            },
          },
        },
        responses: {
          201: { description: 'Продукт создан' },
          400: { description: 'Ошибка валидации' },
          403: { description: 'Нет прав' },
        },
      },
    },
    '/products/{id}': {
      get: {
        tags: ['Products'],
        summary: 'Получить продукт по id',
        security: [{ bearerAuth: [] }],
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer' } }],
        responses: {
          200: { description: 'Продукт' },
          404: { description: 'Не найден' },
        },
      },
      put: {
        tags: ['Products'],
        summary: 'Обновить продукт (admin)',
        security: [{ bearerAuth: [] }],
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer' } }],
        requestBody: {
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  name: { type: 'string' },
                  price: { type: 'number' },
                },
              },
            },
          },
        },
        responses: {
          200: { description: 'Продукт обновлён' },
          403: { description: 'Нет прав' },
        },
      },
      delete: {
        tags: ['Products'],
        summary: 'Удалить продукт (admin)',
        security: [{ bearerAuth: [] }],
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer' } }],
        responses: {
          200: { description: 'Продукт удалён' },
          403: { description: 'Нет прав' },
        },
      },
    },
    '/orders': {
      get: {
        tags: ['Orders'],
        summary: 'Все заказы (admin)',
        security: [{ bearerAuth: [] }],
        responses: {
          200: { description: 'Список заказов' },
          403: { description: 'Нет прав' },
        },
      },
      post: {
        tags: ['Orders'],
        summary: 'Создать заказ',
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['productIds'],
                properties: {
                  productIds: {
                    type: 'array',
                    items: { type: 'integer' },
                    example: [1, 2],
                  },
                },
              },
            },
          },
        },
        responses: {
          201: { description: 'Заказ создан' },
          400: { description: 'Ошибка валидации' },
        },
      },
    },
    '/orders/my': {
      get: {
        tags: ['Orders'],
        summary: 'Мои заказы',
        security: [{ bearerAuth: [] }],
        responses: {
          200: { description: 'Список моих заказов' },
          401: { description: 'Не авторизован' },
        },
      },
    },
    '/orders/{id}': {
      get: {
        tags: ['Orders'],
        summary: 'Получить заказ по id',
        security: [{ bearerAuth: [] }],
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer' } }],
        responses: {
          200: { description: 'Заказ' },
          403: { description: 'Нет прав' },
          404: { description: 'Не найден' },
        },
      },
      delete: {
        tags: ['Orders'],
        summary: 'Удалить заказ (admin)',
        security: [{ bearerAuth: [] }],
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer' } }],
        responses: {
          200: { description: 'Заказ удалён' },
          403: { description: 'Нет прав' },
        },
      },
    },
    '/users': {
      get: {
        tags: ['Users'],
        summary: 'Список пользователей (admin)',
        security: [{ bearerAuth: [] }],
        responses: {
          200: { description: 'Список пользователей' },
          403: { description: 'Нет прав' },
        },
      },
    },
    '/users/me': {
      get: {
        tags: ['Users'],
        summary: 'Получить свой профиль',
        security: [{ bearerAuth: [] }],
        responses: {
          200: { description: 'Профиль пользователя' },
          401: { description: 'Не авторизован' },
        },
      },
      patch: {
        tags: ['Users'],
        summary: 'Обновить свой профиль',
        security: [{ bearerAuth: [] }],
        requestBody: {
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  name: { type: 'string', example: 'New Name' },
                  email: { type: 'string', example: 'new@email.com' },
                },
              },
            },
          },
        },
        responses: {
          200: { description: 'Профиль обновлён' },
          400: { description: 'Ошибка валидации' },
        },
      },
    },
    '/users/{id}': {
      get: {
        tags: ['Users'],
        summary: 'Получить пользователя по id (admin)',
        security: [{ bearerAuth: [] }],
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer' } }],
        responses: {
          200: { description: 'Пользователь' },
          404: { description: 'Не найден' },
        },
      },
      delete: {
        tags: ['Users'],
        summary: 'Удалить пользователя (admin)',
        security: [{ bearerAuth: [] }],
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer' } }],
        responses: {
          200: { description: 'Пользователь удалён' },
          403: { description: 'Нет прав' },
        },
      },
    },
  },
};