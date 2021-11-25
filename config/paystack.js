const paystack = (request) => {
    const mySecretKey = "Bearer sk_test_30a6e5b3193688394537842e9c7271f7ef646b6a"

    const initializePayment = (form, mycallback) => {
        const options = {
            url: 'https://api.paystack.co/transaction/initialize',
            headers: {
                authorization: mySecretKey,
                'content-type': 'application/json',
                'cache-control': 'no-cache'
            },
            form
        }

        const callback = (error, response, body) => {
            return mycallback(error, body)
        }

        request.post(options, callback)
    }

    const verifyPayment = (ref, mycallback) => {
        const options = {
            url: 'https://api.paystack.co/transaction/verify/'+encodeURIComponent(ref),
            headers: {
                authorization: mySecretKey,
                'content-type': 'application/json',
                'cache-control': 'no-cache'
            }
        }

        const callback = (error, response, body) => {
            return mycallback(error, body)
        }

        request(options, callback)
    }
    return{initializePayment, verifyPayment}
}

module.exports = paystack