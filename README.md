# 🛍️ Store Frontend (React)

This is the **frontend** for my "SupplyHub" application built with **React (Using CRA)**.

## 🎯 Description

The app allows two types of users:

- 👤 **suppliers**: 
  - View offers
  - Add new offers
  - View bids for their offers
- 🛠️ **Buyers**:
  - View offers
  - Add new bids on offers

Login and signup are included with a role-based flow (user/admin). Data is persisted in the backend via PostgreSQL.

## 🧑‍💻 User Requirements

1. **Login** with a username and password
2. **Signup** with a username, LEI, email, phone_num, role, city/state, addresses and password
3. On sign up, choose your role: `supplier` or `buyer`
4. **Supplier** users:
   - Can create, and delete their own offers
   - Can view all offers.
   - Can view bids for their own offers
5. **Regular** users:
   - Can view all offers.
   - Can create bids on offers
6. All **users**:
   - Can view thier own profiles & edit their profile data.
7. The app remembers login sessions using `localStorage` & using a state called 'user'

## 🛠️ Technologies

- React 18
- npm (&npx)
- Fetch API, Axios, dotenv
- React bootstrap
- LocalStorage (for session persistence)



## 🚀 Getting Started

```bash
cd store-client
npm install
npm run dev