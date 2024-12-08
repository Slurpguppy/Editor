// reload confirmation
window.addEventListener('beforeunload', (event) => {
    
    event.preventDefault(); 
    event.returnValue = '';
});