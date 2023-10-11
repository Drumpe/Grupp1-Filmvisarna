export function isPasswordValid(password) {
    const lengthRegex = /^.{8,}$/;
    const specialCharRegex = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]/;
    const numberRegex = /\d/;
  
    return (
      lengthRegex.test(password) &&
      specialCharRegex.test(password) &&
      numberRegex.test(password)
    );
}