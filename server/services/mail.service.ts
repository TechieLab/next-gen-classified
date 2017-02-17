var nodemailer = require('nodemailer');

import { Injectable, Optional } from '@angular/core';
import { Http, Headers, Response, RequestOptions, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';

export interface IMailService {
    send(toAddress: string, message: string);
}

export class MailService implements IMailService {

    constructor() {

    }

    send(toAddress: string, message: string) {

        var mailOptions = {
            from: 'donot_reply@realpage.com', // sender address
            to: toAddress, // list of receivers
            subject: 'Welcome to Realpage Classifed', // Subject line
            text: message //, // plaintext body
            // html: '<b>Hello world ✔</b>' // You can choose to send an HTML body instead
        };

        // var transporter = nodemailer.createTransport({
        //     service: 'Gmail',
        //     auth: {
        //         user: 'ramesh.sharma1209@gmail.com', // Your email id
        //         pass: 'ramesh4184' // Your password
        //     }
        // });

        var transporter = nodemailer.createTransport({
            service: 'Gmail', // hostname
           // secure: true, // TLS requires secureConnection to be false
            //port: 465, // port for secure SMTP           
            auth: {
                user: '',
                pass: ''
            }
        });

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Message sent: ' + info.response);
            };
        });
    }
}