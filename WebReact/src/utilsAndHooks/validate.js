export default function isValidEmail(email) {
    // Regular expression for a basic email validation
    const emailRegex = /^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
    
    return emailRegex.test(email);
}