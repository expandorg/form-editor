// @flow
import styles from './styles.module.styl';

const modules = {
  text: styles.text,
  richText: styles.text,
  checkbox: styles.checkbox,
  select: styles.select,
  multiselect: styles.select,
  image: styles.image,
  imageTiles: styles.image,
  regionSelect: styles.image,
  regionMultiselect: styles.image,
  dropdown: styles.dropdown,
  video: styles.video,
  tagVideo: styles.video,
  multipleTagVideo: styles.video,
  agreement: styles.instructions,
  instructions: styles.instructions,
  collapsable: styles.collapsable,
  audio: styles.sound,
  submit: styles.send,
  clipboardText: styles.clipboard,
  yesno: styles.yesno,
  flex: styles.flex,
  input: styles.edit,
  section: styles.section,
  wizard: styles.wizard,
  slider: styles.slider,
};

export default function miniIcon(type: string) {
  return modules[type] || styles.default;
}
