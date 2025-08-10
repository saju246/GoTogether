
# Travel Platform API Documentation

**Base URL:** `/api/v1`



## Auth & User
| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| POST   | `/auth/signup`         | Register as traveler or organizer | Public |
| POST   | `/auth/login`          | Login user | Public |
| POST   | `/auth/logout`         | Logout user | Authenticated |
| POST   | `/auth/verify-email`   | Email verification after signup | Public |
| POST   | `/auth/forgot-password`| Request password reset link | Public |
| POST   | `/auth/reset-password` | Reset password via token | Public |
| PATCH  | `/auth/change-password`| Change password (logged in) | Authenticated |
| GET    | `/users/me`            | Get current logged in user profile | Authenticated |
| PATCH  | `/users/me`            | Edit profile | Authenticated |
| PATCH  | `/users/kyc`           | Update KYC status (organizer only) | Organizer |

---

## Traveler Features
| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| GET    | `/trips`                 | List trips with filters (location, date, category, price) | Public |
| GET    | `/trips/:id`             | View trip details | Public |
| POST   | `/bookings`              | Book a trip + initiate payment (Razorpay) | Traveler |
| POST   | `/bookings/verify`       | Verify Razorpay payment | Traveler |
| GET    | `/bookings/my`           | List my bookings | Traveler |
| PATCH  | `/bookings/:id/cancel`   | Cancel booking | Traveler |
| GET    | `/reviews/trip/:tripId`  | List reviews for a trip | Public |
| POST   | `/reviews/trip/:tripId`  | Add review after trip completion | Traveler |

---

## Organizer Features
| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| GET    | `/organizer/trips`                  | List trips created by organizer | Organizer |
| POST   | `/organizer/trips`                  | Create new trip | Organizer |
| PATCH  | `/organizer/trips/:id`               | Edit trip details | Organizer |
| DELETE | `/organizer/trips/:id`               | Delete trip (if no bookings) | Organizer |
| GET    | `/organizer/trips/:id/participants` | View list of participants | Organizer |
| POST   | `/organizer/trips/:id/notify`       | Send update to participants | Organizer |
| GET    | `/organizer/earnings`               | View earnings summary | Organizer |
| POST   | `/organizer/withdraw`               | Request withdrawal | Organizer |

---

## Chat & Notifications
| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| GET    | `/chats/trip/:tripId`          | Get messages for trip chat | Traveler/Organizer in trip |
| POST   | `/chats/trip/:tripId`          | Send message in trip chat | Traveler/Organizer in trip |
| GET    | `/notifications`               | List my notifications | Authenticated |
| PATCH  | `/notifications/:id/read`      | Mark notification as read | Authenticated |

---

## Admin (Optional)
| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| GET    | `/admin/users`                 | List all users | Admin |
| GET    | `/admin/trips`                 | List all trips | Admin |
| PATCH  | `/admin/users/:id/block`       | Block/unblock user | Admin |
| DELETE | `/admin/trips/:id`             | Remove trip | Admin |

---

## Supporting APIs
| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| GET    | `/categories`                  | Get trip categories | Public |
| GET    | `/locations`                   | Get available trip locations | Public |
| POST   | `/upload`                      | Upload images/videos (S3 or Cloudinary) | Authenticated |

---

### Suggested Folder Structure
```
/routes
  authRoutes.js
  userRoutes.js
  tripRoutes.js
  bookingRoutes.js
  organizerRoutes.js
  chatRoutes.js
  reviewRoutes.js
  notificationRoutes.js

/controllers
/middlewares
/models
```