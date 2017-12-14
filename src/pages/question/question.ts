import { Component, ViewChild, AfterViewChecked, ElementRef } from '@angular/core';
import { NavController, NavParams, AlertController, MenuController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { Camera } from '@ionic-native/camera';
import { ActionSheet, ActionSheetOptions } from '@ionic-native/action-sheet';
import firebase from 'firebase';
import { DataTutorProvider } from '../../providers/data-tutor/data-tutor';
/**
 * Generated class for the QuestionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
	selector: 'page-question',
	templateUrl: 'question.html',
})
export class QuestionPage {
	@ViewChild('scrollMe') private myScrollContainer: ElementRef;
	chatTime: Date = new Date();
	chatting: chatting[];
	chattingNew: chatting[];
	name: any;

	Photos = '';
	base64Image: any;
	storageRef = firebase.storage().ref();
	options: any;

	message: string = '';
	errorMessage: string = '';
	sendMessage: FormGroup;
	pathPhoto = "";
	pages: any[];
	chats:any;

	constructor(public builder: FormBuilder,
		public alertCtrl: AlertController,
		public navCtrl: NavController,
		public navParams: NavParams,
		public menu: MenuController,
		public angularfire: AngularFireDatabase,
		private camera: Camera,
		public alert: AlertController,
		public actionSheet: ActionSheet,
		public dataTutor: DataTutorProvider) {

		this.chats = this.dataTutor.getChats()

		this.name = this.dataTutor.studentData.username;
		console.log('name'+this.name)
		this.pages = ['Home', 'List'];
		menu.enable(true);
		this.sendMessage = this.builder.group({
			'message': ['', Validators.required]
		});
	}

	ngAfterViewChecked() {
		this.myScrollContainer.nativeElement.scrollTop =
			this.myScrollContainer.nativeElement.scrollHeight;
	}

	validate(): any {
		let errorMsg: string;
		if (this.sendMessage.valid) {
			return true;
		}

		let controlMsg = this.sendMessage.controls['message'];
		if (controlMsg.invalid) {
			if (controlMsg.errors['required']) {
				errorMsg = 'Please provide a message.';
			}
		}

		this.errorMessage = errorMsg;
		return false;
	}

	sendMsg() {
		this.message = this.sendMessage.value.message;
		let chatTemp = {
			messages: this.message,
			username: this.name,
			Photo: this.pathPhoto
		}
		this.dataTutor.getChats().push(chatTemp);
		this.pathPhoto = ''
		this.message = '';
	}
	clear(){
		this.pathPhoto='';
	}

	editPhoto() {
		let options: ActionSheetOptions = {
			buttonLabels: ['Take Photo', 'Choose Photo'],
			addCancelButtonWithLabel: 'Cancel',
			androidTheme: this.actionSheet.ANDROID_THEMES.THEME_HOLO_DARK,
		};
		this.actionSheet.show(options).then((buttonIndex: number) => {
			console.log('Button pressed: ' + buttonIndex);
			this.takeSelfie(buttonIndex);
		})
	}


	takeSelfie(sourcePhoto: number): void {
		this.camera.getPicture({
			quality: 95,
			destinationType: this.camera.DestinationType.DATA_URL,
			sourceType: sourcePhoto,
			allowEdit: true,
			encodingType: this.camera.EncodingType.PNG,
			targetWidth: 500,
			targetHeight: 500,
			saveToPhotoAlbum: true
		}).then(profilePicture => {
			// Send the picture to Firebase Storage
			this.Photos = 'data:image/png;base64,' + profilePicture;
			const selfieRef = firebase.storage().ref('/photoDate/'+this.dataTutor.getCurrentTime());
			selfieRef
				.putString(profilePicture, 'base64', { contentType: 'image/png' })
				.then(savedProfilePicture => {
					firebase
						.database()
						.ref('/Photo/')
						.push(savedProfilePicture.downloadURL);
					console.log(profilePicture);
					this.pathPhoto = savedProfilePicture.downloadURL;
				}, error => {
					console.log("ERROR -> " + JSON.stringify(error));
				});
		});
	}
}

export class chatting {
	username: string;
	message: string;
	Photo: string;
}
