export const isValidEmails = (email)=>{
    const emailRegex =  /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

export const isValidPasswords = (password)=>{
    return password.length>=6 && /[A-Z]/.test(password);
}