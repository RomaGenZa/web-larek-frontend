class NotFoundError implements Error {
    name: string;
    message: string;

    constructor(
        message: string
    ) {
        this.name = "NotFoundError"
        this.message = message
    }
}

class ProductNotFoundError implements Error {
    name: string;
    message: string;

    constructor(
        message: string
    ) {
        this.name = "ProductNotFoundError"
        this.message = message
    }
}

class WrongTotalError implements Error {
    name: string;
    message: string;

    constructor(
        message: string
    ) {
        this.name = "WrongTotalError"
        this.message = message
    }
}

class NoAddressError implements Error {
    name: string;
    message: string;

    constructor(
        message: string
    ) {
        this.name = "NoAddressError"
        this.message = message
    }
}


export {
    NotFoundError,
    ProductNotFoundError,
    NoAddressError,
    WrongTotalError
 };