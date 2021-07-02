export const Auth = {

    setCurrentUser: function(user) {
        window.localStorage.setItem("cu", JSON.stringify(user));
    },

    getCurrentUser: function() {
        let currentUser = window.localStorage.getItem('cu');
        if(currentUser != null) {
            return JSON.parse(currentUser);
        }
        return null; 
    }

}