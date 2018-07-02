new Vue({
    el: '#app',
    data: {
        playerHealth: 100,
        monsterHealth: 100,
        gameIsRunning: false,
        heals: 2,
        specialAttacks: 3,
        turns: []
    },
    methods: {
        startGame: function () {
            this.gameIsRunning = true;
            this.playerHealth = 100;
            this.monsterHealth = 100;
            this.turns = [];
            this.heals = 2;
            this.specialAttacks = 3;
        },
        attack: function () {
            var damage = this.calculateDamage(3, 8);
            this.monsterHealth -= damage;
            this.turns.unshift({
                isPlayer: true,
                text: 'Jogador acertou o Monster com dano de ' + damage
            });
            if (this.checkWin()) {
                return;
            }

            this.monsterAttacks();
        },
        specialAttack: function () {
            var damage = this.calculateDamage(10, 20);
            this.monsterHealth -= damage;
            this.specialAttacks -= 1;
            this.turns.unshift({
                isPlayer: true,
                text: 'Jogador acerto o Monstro forte com dano de ' + damage
            });
            if (this.checkWin()) {
                return;
            }
            this.monsterAttacks();
        },
        heal: function () {
            this.heals -= 1;
            if (this.playerHealth <= 90) {
                this.playerHealth += 10;
            } else {
                this.playerHealth = 100;
            }
            this.turns.unshift({
                isPlayer: true,
                text: 'Jogador se curou com 10 de vida'
            });
            this.monsterAttacks();
        },
        giveUp: function () {
            this.gameIsRunning = false;
        },
        monsterAttacks: function() {
            var damage = this.calculateDamage(5, 12);
            this.playerHealth -= damage;
            this.checkWin();
            this.turns.unshift({
                isPlayer: false,
                text: 'Monstro acertou o Jogador com dano de ' + damage
            });
        },
        calculateDamage: function(min, max) {
            return Math.max(Math.floor(Math.random() * max) + 1, min);
        },
        checkWin: function() {
            if (this.monsterHealth <= 0) {
                if (confirm('Ganhou! Jogar novamente?')) {
                    this.startGame();
                } else {
                    this.gameIsRunning = false;
                }
                return true;
            } else if (this.playerHealth <= 0) {
                if (confirm('PERDEU! Jogar novamente?')) {
                    this.startGame();
                } else {
                    this.gameIsRunning = false;
                }
                return true;
            }
            return false;
        }
    }
});