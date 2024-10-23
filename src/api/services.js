// Add a home
export const addHome = async homeData => {
  const response = await fetch(`http://localhost:8000/homes`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      authorization: `Bearer ${localStorage.getItem('aircnc-token')}`,
    },
    body: JSON.stringify(homeData),
  })

  const data = await response.json()
  return data
}

//get all homes
export const getAllHome = async () => {
  const response = await fetch(`http://localhost:8000/homes`)
  const data = await response.json()
  return data
}

//get filtered homes for hosts
export const getHomes = async email => {
  const response = await fetch(
    `http://localhost:8000/homes/${email}`,
    {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        authorization: `Bearer ${localStorage.getItem('aircnc-token')}`,
      },
    }
  )
  const data = await response.json()
  return data
}

// update a home
export const updateHome = async homeData => {
  const response = await fetch(`http://localhost:8000/homes`, {
    method: 'PUT',
    headers: {
      'content-type': 'application/json',
      authorization: `Bearer ${localStorage.getItem('aircnc-token')}`,
    },
    body: JSON.stringify(homeData),
  })

  const data = await response.json()
  return data
}

// Delete a home
export const deleteHome = async id => {
  const response = await fetch(`http://localhost:8000/home/${id}`, {
    method: 'DELETE',
    headers: {
      'content-type': 'application/json',
      authorization: `Bearer ${localStorage.getItem('aircnc-token')}`,
    },
  })
  const result = await response.json()
  return result
}

// Search Result
export const getSearchResult = async (location, from, to, total_guest) => {
  const response = await fetch(
    `http://localhost:8000/search-result?location=${location}&from=${from}&to=${to}&total_guest=${total_guest}`
  )
  const data = await response.json()
  return data
}
