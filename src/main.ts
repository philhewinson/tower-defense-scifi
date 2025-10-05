import Phaser from 'phaser';
import { gameConfig } from './config/gameConfig';

// Initialize Phaser game
const game = new Phaser.Game(gameConfig);

// Make game instance globally accessible for debugging
(window as any).game = game;

console.log('Tower Defense Game - Milestone 1: Initialized');
