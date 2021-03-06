import React from 'react';
import {Animated} from 'react-native';
import PropTypes from 'prop-types';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-community/async-storage';

import {
  Container,
  Photo,
  Name,
  Username,
  Followers,
  ContainerColumn,
} from './styles';

import strings from '../../DefaultStrings/DevItem';

export default function DevListItem({profile, onPress, favorited, onFavorite}) {
  const [animatedScale] = React.useState(new Animated.Value(1));
  const [heartColor, setHeartColor] = React.useState(
    !favorited ? '#5a54ff' : '#e2264d'
  );

  function animateHeart() {
    Animated.timing(animatedScale, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start(() => {
      if (heartColor === '#5a54ff') {
        setHeartColor('#e2264d');
      } else {
        setHeartColor('#5a54ff');
      }
      Animated.timing(animatedScale, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      }).start();
    });
  }

  function handleFav(prof) {
    animateHeart();
    onFavorite(prof);
    console.log('fav');
  }
  return (
    <Container onPress={onPress}>
      <Photo source={{uri: profile.avatar_url}} />
      <ContainerColumn>
        <Name>{profile.login || strings.defaultUserName}</Name>
        <Username>{profile.login}</Username>
      </ContainerColumn>

      {onFavorite && (
        <Followers onPress={() => handleFav(profile)}>
          <Animated.View style={{transform: [{scale: animatedScale}]}}>
            <Icons name="heart" size={20} color={heartColor} />
          </Animated.View>
          {/* <FollowersCount>{profile.followers}</FollowersCount> */}
        </Followers>
      )}
    </Container>
  );
}

DevListItem.propTypes = {
  profile: PropTypes.shape({
    login: PropTypes.string,
    name: PropTypes.string,
    avatar_url: PropTypes.string,
    followers: PropTypes.number,
  }),
};

DevListItem.defaultProps = {
  profile: {},
};
