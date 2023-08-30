/**
 * 需要播放的单词组，先把数组每一项看做一组，所以这里是设置了四组单词； 
 * 获取显示每组字符的容器；
 *  
*/
const words = ["like Art", "Creativity", "Life", "Everything"],
      dynamicText = document.querySelector("h1 span");

/**
 * 当前展示的单词组索引，比如这里默认："like Art"
 * 当前展示的字符索引，比如这里默认："l"
 * 当前删除文本效果状态，默认：false
 */
let wordIndex = 0,
    charIndex = 1,
    isDeleting = false;

function typingEffect() {
  const currentWord = words[wordIndex]; //当前展示的单词
  const currentChar = currentWord.substring(0, charIndex); //当前显示的字符 

  /**元素设置字符的同时，添加类名 */
  dynamicText.textContent = currentChar;
  dynamicText.classList.add("stop-blinking");

  /** 1. 每个单词组播放 */
  if (!isDeleting && charIndex < currentWord.length) {
    charIndex++;
    
    setTimeout(typingEffect, 200);
  } else if (isDeleting && charIndex > 0) {
    /**
     * 3. 设置删除每个字符的效果
     */
    charIndex--;
    
    setTimeout(typingEffect, 200);
  } else {
    /** 
     * 2.设置当前需要删除的单词组或下一个要播放的单词组:
    */
    isDeleting = !isDeleting;
    wordIndex = !isDeleting ? (wordIndex + 1) % words.length : wordIndex;

    dynamicText.classList.remove("stop-blinking");
    setTimeout(typingEffect, 200);
  }
};

typingEffect();
