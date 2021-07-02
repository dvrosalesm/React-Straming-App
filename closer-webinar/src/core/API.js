import axios from 'axios';

const BASE_URL = 'https://admin.imcloser.live/api';
const BASE_URL_CHAT = 'https://admin.imcloser.live:4040';

// FOR EVENTS
const EVENT_EP = BASE_URL + '/event';
const REGISTER_EP = BASE_URL + '/event/register';
const ASSISTANCE_EP = BASE_URL + '/event/assistance';

// FOR CHAT
const MESSAGE_EP = BASE_URL_CHAT + '/messages';

// FOR MESSAGES
const CONTACT_EP = BASE_URL + '/contact';
const NOTES_EP = BASE_URL + '/notes-mail';

export const API = {

    getEvent: function(params, onSuccess, onError) {

        axios.get(EVENT_EP + "/" + params.event)
        .then( r => {
            onSuccess(r.data);
        })
        .catch( e => {
            onError(e);
        });

    },


    getMessages: function(room, onSuccess, onError) {
        axios.get(MESSAGE_EP + "/" + room)
        .then( r => {
            onSuccess(r.data);
        })
        .catch( e => {
            onError(e);
        });
    },

    postMessage: function(params) {
        axios.post(MESSAGE_EP, params)
        .then( res => console.log(res));
    },

    register: function(params, success, error) {
        axios.post(REGISTER_EP, params)
        .then( res => success(res.data))
        .catch( err => error(err));
    },

    assistance: function(params, success, error) {
        axios.post(ASSISTANCE_EP, params)
        .then( res => success(res.data))
        .catch( err => error(err));
    },

    sendContactMessage: function(params, success, error) {
        axios.post(CONTACT_EP, params)
        .then( res => success(res.data))
        .catch( err => error(err));
    },

    sendNotes: function(params, success, error) {
        axios.post(NOTES_EP, params)
        .then( res => success(res.data))
        .catch( err => error(err));
    }

}