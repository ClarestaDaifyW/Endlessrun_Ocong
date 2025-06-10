var sceneMenu = new Phaser.Class({
  Extends: Phaser.Scene,
  initialize: function () {
    Phaser.Scene.call(this, { key: "sceneMenu" });
  },
  init() {},
  preload() {
    this.load.image("bg_start", "assets/images/bg_start.png");
    this.load.image("btn_play", "assets/images/btn_play.png");
    this.load.image("title_game", "assets/images/title_game.png");
    this.load.image("panel_skor", "assets/images/panel_skor.png");
    this.load.audio("snd_ambience", "assets/audio/ambience.mp3");
    this.load.audio("snd_touch", "assets/audio/touch.mp3");
    this.load.audio("snd_transisi_menu", "assets/audio/transisi_menu.mp3");
    this.load.spritesheet("sps_mummy", "assets/sprite/mummy37x45.png", {
      frameWidth: 37,
      frameHeight: 45,
    });
  },

  create() {
    X_POSITION = {
      LEFT: 0,
      CENTER: game.canvas.width / 2,
      RIGHT: game.canvas.width,
    };

    Y_POSITION = {
      TOP: 0,
      CENTER: game.canvas.height / 2,
      BOTTOM: game.canvas.height,
    };

    if (snd_ambience == null) {
      snd_ambience = this.sound.add("snd_ambience");
      snd_ambience.loop = true;
      snd_ambience.setVolume(0.35);
      snd_ambience.play();
    }

    this.snd_touch = this.sound.add("snd_touch");
    var snd_transisi = this.sound.add("snd_transisi_menu");

    var skorTertinggi = localStorage["highscore"] || 0;
    // Menambahkan background ke dalam scene
    this.add.image(X_POSITION.CENTER, Y_POSITION.CENTER, "bg_start");

    // Menambahkan sprite tombol play ke dalam scene
    var btnPlay = this.add.image(
      X_POSITION.CENTER,
      Y_POSITION.CENTER,
      "btn_play"
    );
    btnPlay.setDepth(10);

    // Menambahkan judul game
    this.titleGame = this.add.image(1024 / 2, 200, "title_game");
    this.titleGame.setDepth(10);

    //mengurangi posisi y judul game sebanyak 384 pixel
    this.titleGame.y -= 384;

    //membuat panel nilai
    var panelSkor = this.add.image(1024 / 2, 768 - 120, "panel_skor");
    panelSkor.setOrigin(0.5);
    panelSkor.setDepth(10);
    panelSkor.setAlpha(0.8);

    var lblSkore = this.add.text(
      panelSkor.x + 25,
      panelSkor.y,
      "High Score : " + skorTertinggi
    );
    lblSkore.setOrigin(0.5);
    lblSkore.setDepth(10);
    lblSkore.setFontSize(30);
    lblSkore.setTint(0xff732e);

    var diz = this;

    //menambah animasi judul
    this.tweens.add({
      targets: diz.titleGame,
      ease: "Bounce.easeOut",
      duration: 750,
      delay: 250,
      y: 200,
      onComplete: function () {
        snd_transisi.play();
      },
    });

    //mengatur scale awal btnPlay menjadi 0
    btnPlay.setScale(0);

    //menambahkan animasi ke tombol play
    this.tweens.add({
      targets: btnPlay,
      ease: "Back",
      duration: 500,
      delay: 750,
      scaleX: 1,
      scaleY: 1,
    });

    this.titleGame.setScale(0);

    //animasi title
    this.tweens.add({
      targets: diz.titleGame,
      ease: "Elastic",
      duration: 750,
      delay: 1000,
      scaleX: 1,
      scaleY: 1,
    });

    //menambahkan event listener untuk mouse down
    this.input.on(
      "gameobjectover",
      function (pointer, gameObject) {
        console.log("Scene Menu | Object Over");
        if (!btnClicked) return;
        if (gameObject == btnPlay) {
          btnPlay.setTint(0x616161);
        }
      },
      this
    );
    this.input.on(
      "gameobjectout",
      function (pointer, gameObject) {
        console.log("Scene Menu | Object Out");
        if (!btnClicked) return;
        if (gameObject == btnPlay) {
          btnPlay.setTint(0xffffff);
          btnClicked = true;
        }
      },
      this
    );
    this.input.on(
      "gameobjectdown",
      function (pointer, gameObject) {
        console.log("Scene Menu | Object Click");
        if (gameObject == btnPlay) {
          btnPlay.setTint(0x616161); // Warna gelap saat tombol diklik
          btnClicked = true;
        }
      },
      this
    );
    //menambahkan deteksi objek selesai di klik
    this.input.on(
      "gameobjectup",
      function (pointer, gameObject) {
        console.log("Scene Menu | Object End Click");
        if (gameObject == btnPlay) {
          btnPlay.setTint(0xffffff);
          this.scene.start("scenePlay");
          this.snd_touch.play();
        }
      },
      this
    );
    this.input.on(
      "pointerup",
      function (pointer, gameObject) {
        console.log("Scene Menu | Mouse Up");
        btnClicked = false;
      },
      this
    );

    btnPlay.setInteractive();

    //menambahkan variabel penanda apakah tombol sedang diklik atau tidak
    var btnClicked = false;

    mummy = this.add.sprite(1024 / 2, 768 - 170, "sps_mummy");
    mummy.setDepth(10);
    mummy.setScale(3);
    this.anims.create({
      key: "walk",
      frames: this.anims.generateFrameNumbers("sps_mummy", {
        start: 0,
        end: 17,
      }),
      frameRate: 16,
    });
    // const sprite = this.add
    //   .sprite(570, 768 / 2 + 150, "sps_mummy")
    //   .setScale(4)
    //   .setDepth(10);
    mummy.play({ key: "walk", repeat: -1 });
  },

  // //dari chtgpt
  // btnPlay.on("pointerdown", () => {
  //   this.scene.start("scenePlay"); // Pindah ke scenePlay
  // });

  // //menambahkan animasi judul game
  // this.tweens.add({
  //   targets: diz.titleGame,
  //   ease: "Bounce.easeOut",
  //   duration: 750,
  //   delay: 250,
  //   y: 200,
  // });

  // this.input.on(
  //   "gameobjectover",
  //   function (pointer, gameObject) {
  //     console.log("Scene Menu | Object Over");
  //     if (gameObject == btnPlay) {
  //       btnPlay.setTint(0x616161); // Warna gelap saat mouse berada di atas tombol
  //     }
  //   },
  //   this
  // );

  // this.input.on(
  //   "gameobjectout",
  //   function (pointer, gameObject) {
  //     console.log("Scene Menu | Object Out");
  //     if (gameObject == btnPlay) {
  //       btnPlay.setTint(0xffffff); // Kembali ke warna semula saat mouse keluar
  //     }
  //   },
  //   this
  // );

  // this.input.on(
  //   "gameobjectup",
  //   function (pointer, gameObject) {
  //     console.log("Scene Menu | Object End Click");
  //     if (gameObject == btnPlay) {
  //       btnPlay.setTint(0xffffff); // Kembali ke warna semula saat tombol dilepaskan
  //       btnClicked = false;
  //     }
  //   },
  //   this
  // );

  // this.input.on(
  //   "pointerup",
  //   function (pointer, gameObject) {
  //     console.log("Scene Menu | Mouse Up");
  //   },
  //   this
  // );

  // //menambahkan deteksi objek selesai diklik
  // this.input.on('gameobjectup', function (pointer, gameObject){
  //   console.log("Scene Menu | Object End Click");
  //   if(gameObject == btnPlay){
  //     btnPlay.setTint(0xffffff);

  //     //sesuaikan nama scene dengan yang sebelumnya dibuat
  //     this.scene.start('scenePlay');
  //   }
  // }, this);

  update() {},
});
