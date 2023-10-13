export function isPasswordValid(password) {
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\-])(?=.*\d).{8,}$/;
  const specialCharRegex = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]/;
  const numberRegex = /\d/;

  return (
    passwordRegex.test(password) &&
    specialCharRegex.test(password) &&
    numberRegex.test(password)
  );
}

export function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}