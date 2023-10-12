// post (create)
export async function post(route, body, method = 'POST') {
  return await (await fetch('/api/' + route, {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  }))
    .json().catch(e => ({ error: e + '' }));
}

// get (read)
export async function get(route, method = 'GET') {
  return await (await fetch('/api/' + route, { method }))
    .json().catch(e => ({ error: e + '' }));
}

// put (update)
export async function put(route, body) {
  post(route, body, 'PUT');
}

// del (delete)
// (delete is a reserved JS word so 'del' instead)
export async function del(route, body) {
  get(route, body, 'DELETE');
}

// sending forms

export async function sendForm({ event, route, body, method, callback }) {
  method = method || 'POST';
  // do not reload the web page
  event.preventDefault();
  // delete props starting with '_' from body
  Object.keys(body)
    .filter(prop => prop[0] === '_')
    .forEach(prop => delete body[prop]);
  // post/put the and call callback with response
  callback(await post(route, body, method));
}

//delete booking

export async function cancelBooking(route, content) {
  return fetch(route, {
    method: 'DELETE',
    body: content
  }).then(response => response.json())
}
