<template>
  <div class="EmojiList">
    <nav>
    <span 
    v-for="(emojisTable,index) in table"
    :key="index"
    @click="changeSelect(index)"
    :class="index === selectTab ? 'selected' : '' "
    >{{ emojisTable[0] }}</span>
    </nav>
    <ol>
    <li 
    v-for="(emoji,index) in emojis" 
    :key="index"
    @click="selectEmoji(emoji,index)"
    :class="index === emoSelect ? 'selectedEmoji' : '' "
    >{{ emoji }}</li>
    </ol>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch, reactive } from 'vue';
import { emojiList } from './EmojiList';

const emit = defineEmits()
defineProps({
    modelValue: {
        type: String,
    }
})

const selectTab = ref(0)
const emoSelect = ref(0)

const table = [
    ['表情', ['face-smiling', 'face-affection', 'face-tongue', 'face-hand',
        'face-neutral-skeptical', 'face-sleepy', 'face-unwell', 'face-hat',
        'face-glasses', 'face-concerned', 'face-negative', 'face-costume']],
    ['手势', ['hand-fingers-open', 'hand-fingers-partial', 'hand-single-finger',
    'hand-fingers-closed', 'hands', 'hand-prop', 'body-parts']],
    ['人物', ['person', 'person-gesture', 'person-role', 'person-fantasy',
    'person-activity', 'person-sport', 'person-resting']],
    ['衣服', ['clothing']],
    ['动物', ['cat-face', 'monkey-face', 'animal-mammal', 'animal-bird',
    'animal-amphibian', 'animal-reptile', 'animal-marine', 'animal-bug']],
    ['植物', ['plant-flower', 'plant-other']],
    ['自然', ['sky & weather', 'science']],
    ['食物', [
    'food-fruit', 'food-vegetable', 'food-prepared', 'food-asian',
    'food-marine', 'food-sweet'
    ]],
    ['运动', ['sport', 'game']],
]

const emojis: string[] = reactive([])

table[selectTab.value][1].map(category => {
    emojiList.find(array => array[0] === category)?.find(emoji => {
        if(typeof emoji !== "string"){
            emoji.map(emo => {
                emojis.push(emo)
                return emo
            })            
        }
    })
})

const changeSelect = (index:number) => {
    selectTab.value = index
}
const selectEmoji = (emoji:string,index:number) => {
    emit('update:modelValue',emoji)
    emoSelect.value = index
}

watch(selectTab,() => {
    emojis.splice(0,emojis.length)
    table[selectTab.value][1].map(category => {
    emojiList.find(array => array[0] === category)?.find(emoji => {
        if(typeof emoji !== "string"){
            emoji.map(emo => {
                emojis.push(emo)
                return emo
            })            
        }
    })
})
})


  
</script>

<style lang="scss" scoped>
  .emojiList {
  flex-grow: 1;
  border: 1px solid var(--input-border-color);
  border-radius: var(--input-radius);
  font-size: 18px;
  font-size: 14px;
  &.error {
    border-color: var(--error-color);
  }
  > nav {
    display: flex;
    flex-wrap: nowrap;
    overflow: auto;
    padding: 0 4px;
    &::-webkit-scrollbar {
      display: none;
    }
    > span {
      flex-shrink: 0;
      display: inline-block;
      padding: 8px;
      color: var(--emoji-nav-text);
      &.selected {
        color: var(--emoji-nav-text-selected);
      }
    }
  }
  > ol {
    display: flex;
    flex-wrap: wrap;
    align-content: flex-start;
    font-size: 22px;
    line-height: 32px;
    height: calc(32px * 12);
    overflow: auto;
    padding: 1px 4px;
    &::-webkit-scrollbar {
      display: none;
    }
    > li {
      flex-shrink: 0;
      flex-grow: 0;
      width: 10%;
      text-align: center;
      &.selectedEmoji{
        outline: 1px solid var(--button-bg);
        border-radius: var(--input-radius);
      }
    }
  }
}
</style>