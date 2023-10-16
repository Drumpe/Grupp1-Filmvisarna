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
export function isNameValid(name) {
  const nameRegex = /^[a-zA-ZåäöÅÄÖ]+$/;  // Regex för att säkerställa endast bokstäver inklusive svenska specialtecken
  return nameRegex.test(name);
}
