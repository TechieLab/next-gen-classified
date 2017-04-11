import { Component, Injectable, OnInit } from '@angular/core';
import { Headers } from '@angular/http';

import { Events, NavController, NavParams, Platform, ToastController, ActionSheetController, LoadingController, Loading } from 'ionic-angular';
import { Camera, File, Transfer, FilePath, FileUploadOptions } from 'ionic-native';
import { Media } from '../../app/models/media';
import { StorageService } from '../../app/services/storage.service';

declare var cordova: any;

export interface IUploadService {
    openActionSheet(url: string);
}

@Injectable()
export class UploadService {
    private loading: Loading;
    private imagePath: any;
    private imageNewPath: any;
    public filename: string;
    private uploadUrl: string;

    constructor(public actionSheetCtrl: ActionSheetController,
        public events: Events,
        public platform: Platform,
        public toastCtrl: ToastController,
        public loadingCtrl: LoadingController) {
        // If we navigated to this page, we will have an item available as a nav param
        //this.selectedItem = navParams.get('item');        
    }

    openActionSheet(url: string) {
        this.uploadUrl = url;

        let actionSheet = this.actionSheetCtrl.create({
            title: 'Change Picture',
            buttons: [
                {
                    text: 'Capture Photo',
                    icon: 'camera',
                    handler: () => {
                        this.actionHandler(2);
                    }
                }, {
                    text: 'Select Photo',
                    icon: 'albums',
                    handler: () => {
                        this.actionHandler(1);
                    }
                }, {
                    text: 'Remove photo',
                    icon: 'trash',
                    handler: () => {
                        this.events.publish('photo-removed');
                    }
                }, {
                    text: 'Cancel',
                    role: 'cancel',
                    handler: () => {
                        console.log('Cancel clicked');
                    }
                }
            ]
        });
        actionSheet.present();
    }

    private uploadPhoto() {
        var fNameWithQuery = (this.imagePath.split('/'))[(this.imagePath.split('/').length) - 1];
        this.filename = 'file' + fNameWithQuery.split('?')[0];

        let headers = new Headers();
        headers.append('Content-Type', 'multipart/form-data');
        headers.append('Authorization', StorageService.getToken());

        let options = <FileUploadOptions>{};

        options.fileKey = "file";
        options.fileName = this.filename;
        options.mimeType = "image/jpeg";
        options.chunkedMode = false;
        options.params = {
            fileName: this.filename,
            folder: 'profile'
        }
        options.headers = {
            'Authorization': StorageService.getToken()
        };

        const fileTransfer = new Transfer();
        let loader = this.loadingCtrl.create({
            content: "Please wait..."
        });

        loader.present();

        fileTransfer.upload(this.imageNewPath, encodeURI(this.uploadUrl), options, false).then((entry) => {
            this.imagePath = '';
            loader.dismiss();
            this.events.publish('photo-uploaded');
        }, (err) => {
            alert(JSON.stringify(err));
            loader.dismiss();
        });
    }

    private actionHandler(selection: any) {
        var options: any;

        if (selection == 1) {
            options = {
                quality: 75,
                destinationType: Camera.DestinationType.FILE_URI,
                sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
                allowEdit: true,
                encodingType: Camera.EncodingType.JPEG,
                targetWidth: 500,
                targetHeight: 500,
                saveToPhotoAlbum: false
            };
        } else {
            options = {
                quality: 75,
                destinationType: Camera.DestinationType.FILE_URI,
                sourceType: Camera.PictureSourceType.CAMERA,
                allowEdit: true,
                encodingType: Camera.EncodingType.JPEG,
                targetWidth: 500,
                targetHeight: 500,
                saveToPhotoAlbum: false
            };
        }

        Camera.getPicture(options).then((imgUrl) => {
            var sourceDirectory = imgUrl.substring(0, imgUrl.lastIndexOf('/') + 1);
            var sourceFileName = imgUrl.substring(imgUrl.lastIndexOf('/') + 1, imgUrl.length);
            sourceFileName = sourceFileName.split('?').shift();

            File.copyFile(sourceDirectory, sourceFileName, cordova.file.externalApplicationStorageDirectory, sourceFileName).then((result: any) => {
                this.imagePath = imgUrl;
                this.imageNewPath = result.nativeURL;
                this.uploadPhoto();
            }, (err) => {
                alert(JSON.stringify(err));
            })

        }, (err) => {
            alert(JSON.stringify(err))
        });

    }
}