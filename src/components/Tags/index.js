import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import Input from './Input';
import styles from './styles';
import Tag from './Tag';

const Tags = props => {
  const {
    initialTags,
    containerStyle,
    style,
    readonly,
    createTagOnString,
    createTagOnReturn,
    maxNumberOfTags,
    tagContainerStyle,
    tagTextStyle,
    deleteTagOnPress,
    onTagPress,
    renderTag
  } = props;

  const [tags, setTags] = useState([]);
  const [text, setText] = useState('');

  useEffect(() => {
    setTags(initialTags);
  }, [initialTags]);

  const showLastTag = () => {
    setTags(tags.slice(0, -1));
    setText(tags.slice(-1)[0] || ' ')
  };

  const addTag = text => {
    setTags([...tags, text.trim()]);
    setText('')
  };

  const onChangeText = text => {
    if (text.length === 0) {
      showLastTag();
    } else if (
      text.length > 1 &&
      createTagOnString.includes(text.slice(-1)) &&
      !text.match(
        new RegExp(`^[${createTagOnString.join('')}]+$`, 'g')
      ) &&
      !(tags.indexOf(text.slice(0, -1).trim()) > -1)
    ) {
      addTag(text.slice(0, -1));
    } else {
      setText(text.trim());
    }
  };

  const onSubmitEditing = () => {
    if (!createTagOnReturn) {
      return;
    }
    addTag(text);
  };

  return (
    <View style={[styles.container, containerStyle, style]}>
      {tags.map((tag, index) => {
        const tagProps = {
          tag,
          index,
          deleteTagOnPress,
          onPress: event => {
            event.persist();
            if (deleteTagOnPress && !readonly) {
              setTags([
                ...tags.slice(0, index),
                ...tags.slice(index + 1)
              ]);
              onTagPress && onTagPress(index, tag, event, true)
            } else {
              onTagPress && onTagPress(index, tag, event, false);
            }
          },
          tagContainerStyle,
          tagTextStyle
        };

        return renderTag(tagProps);
      })}

      {!readonly && maxNumberOfTags > tags.length && (
        <Input
          value={text}
          onChangeText={onChangeText}
          onSubmitEditing={onSubmitEditing}
          {...props}
        />
      )}
    </View>
  );
};

Tags.defaultProps = {
  initialTags: [],
  initialText: '',
  createTagOnString: [',', ' '],
  createTagOnReturn: true,
  readonly: false,
  deleteTagOnPress: true,
  maxNumberOfTags: Number.POSITIVE_INFINITY,
  renderTag: ({ tag, index, ...rest }) => (
    <Tag key={`${tag}-${index}`} label={tag} {...rest} />
  )
};

Tags.propTypes = {
  initialText: PropTypes.string,
  initialTags: PropTypes.arrayOf(PropTypes.string),
  createTagOnString: PropTypes.array,
  createTagOnReturn: PropTypes.bool,
  onChangeTags: PropTypes.func,
  readonly: PropTypes.bool,
  maxNumberOfTags: PropTypes.number,
  deleteTagOnPress: PropTypes.bool,
  onTagPress: PropTypes.func,
  renderTag: PropTypes.func,
  /* style props */
  containerStyle: PropTypes.any,
  style: PropTypes.any,
  inputContainerStyle: PropTypes.any,
  inputStyle: PropTypes.any,
  tagContainerStyle: PropTypes.any,
  tagTextStyle: PropTypes.any,
  textInputProps: PropTypes.object
};

export { Tags };
export default Tags;
