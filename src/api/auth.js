export const setAuthToken = user => {
  const currentUser = {
    email: user.email,
  }

  //   Save user in db & get token
  fetch(`http://localhost:8000/user/${user?.email}`, {
    method: 'PUT',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify(currentUser),
  })
    .then(res => res.json())
    .then(data => {
      console.log(data)
      //Save token in LocalStorage
      localStorage.setItem('aircnc-token', data.token)
    })
}

export const saveBooking = bookingData => {
  // Post method fetch
  return fetch(`http://localhost:8000/bookings`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      authorization: `Bearer ${localStorage.getItem('aircnc-token')}`,
    },
    body: JSON.stringify(bookingData),
  })
}
