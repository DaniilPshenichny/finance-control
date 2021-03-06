import decode from 'jwt-decode';
export default class UserService {
    constructor() {
        this.fetch = this.fetch.bind(this)
        this.getProfile = this.getProfile.bind(this)
    }

    loggedIn() {
        const token = this.getToken()
        return !!token && !this.isTokenExpired(token)
    }

    isTokenExpired(token) {
        try {
            const decoded = decode(token);
            if (decoded.exp < Date.now() / 1000) {
                return true;
            }
            else
                return false;
        }
        catch (err) {
            return false;
        }
    }

    getProfile() {
        return decode(this.getToken());
    }

    getToken() {
        return localStorage.getItem('id_token')
    }

    fetch(url, options) {
        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }

        if (this.loggedIn()) {
            headers['Authorization'] = 'Bearer ' + this.getToken()
        }

        return fetch(url, {
            headers,
            ...options
        })
            .then(this._checkStatus)
            .then(response => response.json())
    }

    getInvestments = (userId) => {
        return this.fetch(`/get-investments`, {
            method: 'POST',
            body: JSON.stringify({
                userId
            })
        }).then(res => {
            return res;
        })
    }

    getInvestment = (investmentId) => {
        return this.fetch(`/get-investment`, {
            method: 'POST',
            body: JSON.stringify({
                investmentId
            })
        }).then(res => {
            return res;
        })
    }

    deleteInvestment = (investmentId) => {
        return this.fetch(`/delete-investment`, {
            method: 'POST',
            body: JSON.stringify({
                investmentId
            })
        }).then(res => {
            return res;
        })
    }

    updateInvestment = (investmentId, investmentName, investedAmount, investmentLink, investmentDescription) => {
        return this.fetch(`/edit-investment`, {
            method: 'POST',
            body: JSON.stringify({
                investmentId,
                investmentName,
                investedAmount,
                investmentLink,
                investmentDescription
            })
        }).then(res => {
            return res;
        })
    }

    createInvestment = ( userId, investmentName, investedAmount, investmentLink, investmentDescription) => {
        return this.fetch(`/create-investment`, {
            method: 'POST',
            body: JSON.stringify({
                userId,
                investmentName,
                investedAmount,
                investmentLink,
                investmentDescription
            })
        }).then(res => {
            return res;
        })
    }

    _checkStatus(response) {
        if (response.status >= 200 && response.status < 300) {
            return response
        } else {
            var error = new Error(response.statusText)
            error.response = response
            throw error
        }
    }
}