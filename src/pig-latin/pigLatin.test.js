import { unmountComponentAtNode } from "react-dom";
import {pigLatin} from "./pigLatin";

let container = null;

beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

describe('Pig Latin Tests', () => {
    it('should move the first consonent to the end of the word + ay', () => {
      const word = "Canada";
      expect(pigLatin(word)).toMatch("Anadacay"); 
    });
    it('should return the word + way', () => {
        const word = "Apple";
        expect(pigLatin(word)).toMatch("Appleway"); 
    });
    it('should move the consonents to the end of the word + ay', () => {
        const word = "child";
        expect(pigLatin(word)).toMatch("Ildchay"); 
    });
    it('should return the correct pig latin for the sentence', () => {
        const phrase = "Pig latin is hard to speak";
        expect(pigLatin(phrase)).toMatch("Igpay atinlay isway ardhay otay eakspay"); 
    });
    it('should return empty', () => {
        const phrase = "";
        expect(pigLatin(phrase)).toMatch(""); 
    });
});