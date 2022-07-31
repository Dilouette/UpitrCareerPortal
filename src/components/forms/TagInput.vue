<template>
  <div
    @click="focusNewTag()"
    :class="{
      'tags--focus': isInputActive,
      'tags--error': isError,
    }"
    class="tags"
  >
    <div class="relative rounded-md shadow-sm tags-content">
      <span v-for="(tag, index) in innerTags" :key="index" class="tags-tag">
        <slot
          v-if="$slots.item"
          name="item"
          v-bind="{ name: tag, index }"
        ></slot>
        <span v-else> {{ tag }} </span>
        <a
          v-if="!readOnly"
          @click.prevent.stop="remove(index)"
          class="tags-remove-tag"
        ></a>
      </span>
      <input
        ref="inputTag"
        :placeholder="placeholder"
        v-model="newTag"
        @keydown.delete.stop="removeLastTag"
        @keydown="addNew"
        @blur="handleInputBlur"
        @focus="handleInputFocus"
        @input="onInputChange"
        :class="[!error ? 'text-input' : 'text-input-error']"
      />
    </div>
  </div>
</template>

<script>
const validators = {
  email: new RegExp(
    /^[a-z][a-z0-9_.]{2,50}@[a-z0-9]{2,}(\.[a-z0-9]{2,4}){1,2}$/
  ),
  url: new RegExp(
    /^(https?|ftp|rmtp|mms):\/\/(([A-Z0-9][A-Z0-9_-]*)(\.[A-Z0-9][A-Z0-9_-]*)+)(:(\d+))?\/?/i
  ),
  text: new RegExp(/^[a-zA-Z]+$/),
};
export default {
  emits: [
    "update:modelValue",
    "on-limit",
    "on-tags-changed",
    "on-remove",
    "on-error",
    "on-focus",
    "on-blur",
  ],
  props: {
    readOnly: {
      type: Boolean,
      default: false,
    },
    modelValue: {
      type: String,
      default: "",
    },
    validate: {
      type: [String, Function, Object],
      default: "",
    },
    addTagOnKeys: {
      type: Array,
      default: function () {
        return [
          13, // Enter
          188, // Comma ','
          // 32, // Space
        ];
      },
    },
    placeholder: {
      type: String,
      default: "",
    },
    tags: {
      type: Array,
      default: () => [],
    },
    limit: {
      type: Number,
      default: -1,
    },
    allowDuplicates: {
      type: Boolean,
      default: false,
    },
    addTagOnBlur: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      isInputActive: false,
      isError: false,
      newTag: "",
      innerTags: [],
    };
  },
  computed: {
    isLimit() {
      let isLimit =
        this.limit > 0 && Number(this.limit) === this.innerTags.length;
      if (isLimit) {
        this.$emit("on-limit");
      }
      return isLimit;
    },
  },
  watch: {
    error() {
      this.isError = this.error;
    },
    modelValue: {
      immediate: true,
      handler(value) {
        this.newTag = value;
      },
    },
    tags: {
      deep: true,
      immediate: true,
      handler: 'updateTags',
      // handler(tags) {
      //   this.innerTags = [...tags];
      //   this.tagChange();
      // },
    },
    newTag() {
      if (this.newTag.length > 50) {
        this.$refs.inputTag.className = "tags-new-tag tags-new-tag--error";
        this.$refs.inputTag.style.textDecoration = "underline";
      }
    },
  },
  methods: {
    updateTags() {
      this.innerTags = [...this.tags];
      this.newTag = "";
      this.$emit("update:modelValue", "");
      this.tagChange();
    },
    onInputChange(event) {
      this.$emit("update:modelValue", event.target.value);
      this.$refs.inputTag.className = "tags-new-tag";
      this.$refs.inputTag.style.textDecoration = "none";
    },
    resetData() {
      this.innerTags = [];
    },
    focusNewTag() {
      if (this.readOnly || !this.$el.querySelector(".tags-new-tag")) {
        return;
      }
      this.$el.querySelector(".tags-new-tag").focus();
    },
    handleInputFocus(event) {
      this.isInputActive = true;
      this.$emit("on-focus", event);
    },
    handleInputBlur(e) {
      this.isInputActive = false;
      this.addNew(e);
      this.$emit("on-blur", e);
    },
    addNew(e) {
      const keyShouldAddTag = e
        ? this.addTagOnKeys.indexOf(e.keyCode) !== -1
        : true;
      const typeIsNotBlur = e && e.type !== "blur";
      if (
        (!keyShouldAddTag && (typeIsNotBlur || !this.addTagOnBlur)) ||
        this.isLimit
      ) {
        return;
      }
      if (
        this.newTag &&
        (this.allowDuplicates || this.innerTags.indexOf(this.newTag) === -1) &&
        this.validateIfNeeded(this.newTag) &&
        this.newTag.length <= 50
      ) {
        this.innerTags.push(this.newTag);
        this.newTag = "";
        this.$emit("update:modelValue", "");
        this.tagChange();
        e && e.preventDefault();
      } else {
        if (this.validateIfNeeded(this.newTag)) {
          if (this.newTag && this.newTag.length <= 50) {
            this.makeItError(true);
          } else {
            this.makeItError("maxLength");
          }
        } else {
          this.makeItError(false);
        }
        e && e.preventDefault();
      }
    },
    makeItError(isDuplicatedOrMaxLength) {
      this.$refs.inputTag.className = "tags-new-tag tags-new-tag--error";
      this.$refs.inputTag.style.textDecoration = "underline";
      this.$emit("on-error", isDuplicatedOrMaxLength);
    },
    validateIfNeeded(tagValue) {
      if (this.validate === "" || this.validate === undefined) {
        return true;
      }
      if (typeof this.validate === "function") {
        return this.validate(tagValue);
      }
      if (
        typeof this.validate === "string" &&
        Object.keys(validators).indexOf(this.validate) > -1
      ) {
        return validators[this.validate].test(tagValue);
      }
      if (
        typeof this.validate === "object" &&
        this.validate.test !== undefined
      ) {
        return this.validate.test(tagValue);
      }
      return true;
    },
    removeLastTag() {
      if (this.newTag) {
        return;
      }
      this.innerTags.pop();
      this.tagChange();
    },
    remove(index) {
      this.innerTags.splice(index, 1);
      this.tagChange();
      this.$emit("on-remove", index);
    },
    tagChange() {
      this.$emit("on-tags-changed", this.innerTags);
    },
  },
};
</script>

<style>
.tags {
  border-radius: 5px;
  height: 35px;
  line-height: 1.4 !important;
  background-color: #fff;
  border: 1px solid #9ca3af;
  overflow: hidden;
  cursor: text;
  text-align: left;
  -webkit-appearance: textfield;
  display: flex;
  flex-wrap: wrap;
  overflow-wrap: normal;
  overflow-y: auto;
}
.tags--focus {
  outline: 0;
  border-color: #000000;
  box-shadow: 0 0 0 1px #000000;
}
.tags--error {
  border-color: #f56c6c;
}
.tags .tags-content {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  /* overflow-x: scroll; */
}
.tags .tags-tag {
  display: flex;
  font-weight: 400;
  margin: 3px;
  padding: 0 5px;
  background: #317caf;
  color: #ffffff;
  height: 27px;
  border-radius: 5px;
  align-items: center;
}
.tags .tags-tag .tags-remove-tag {
  color: #ffffff;
  transition: opacity 0.3s ease;
  opacity: 0.5;
  cursor: pointer;
  padding: 0 5px 0 7px;
}
.tags .tags-tag .tags-remove-tag::before {
  content: "x";
}
.tags .tags-tag .tags-remove-tag:hover {
  opacity: 1;
}
.tags .tags-new-tag {
  background: transparent;
  border: 0;
  font-weight: 400;
  margin: 3px;
  outline: none;
  padding: 0 4px;
  flex: 1;
  min-width: 60px;
  height: 27px;
}
.tags .tags-new-tag--error {
  color: #f56c6c;
}
</style>
