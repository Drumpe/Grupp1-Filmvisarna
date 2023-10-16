// post (create)
export async function post(route, body, method = 'POST') {
  return await (await fetch('/api/' + route, {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  }))
    .json().catch(e => ({ error: e + '<-- POST' }));
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
  return post(route, body, 'DELETE');
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