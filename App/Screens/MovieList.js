/* @flow */

import React from 'react';
import {
  Alert,
  Dimensions,
  Image,
  Linking,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';

import Colors from '../Theme/Colors';

var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full height

export default class MovieList extends React.Component {
  constructor(props) {
    super(props);
    this._onLogoPressed = this._onLogoPressed.bind(this);
    //this.handleLogoutClick = this.handleLogoutClick.bind(this);
    this.movie = undefined;
  }

  _onLogoPressed = (link) => {
    console.log(link);
    Linking.openURL(link).catch((err) => Alert.alert('oops!', err));
  };

  render() {
    this.movie = this.props.navigation.state.params.movie;

    return (
      <SafeAreaView>
        <ScrollView style={styles.scrollView}>
          <View style={styles.mainView}>
            <View style={styles.movieName}>
              <Text style={styles.movieNameText}>{this.movie.title}</Text>
            </View>
            <View style={styles.imageBackGround}>
              <View style={styles.imgView}>
                <Image
                  source={{uri: this.movie.poster_url}}
                  style={styles.movImg}
                />
              </View>

              <View style={styles.ratingView}>
                <Text style={styles.ratingText}>
                  imdb: {this.movie.imdb_rating}
                </Text>
                <Text style={styles.ratingText}>
                  rotten: {this.movie.rt_rating}
                </Text>
                <Text style={styles.ratingText}>
                  tmdb: {this.movie.tmdb_rating}
                </Text>
              </View>

              <View style={styles.movieSummary}>
                <Text style={styles.summaryText}>{this.movie.overview}</Text>
              </View>

              <View style={styles.genreView}>
                <Text style={styles.genreText}>
                  Lang: {this.movie.language ? this.movie.language : 'NA'}
                </Text>

                <Text style={styles.genreText}>
                  Year:{' '}
                  {this.movie.original_release_year
                    ? this.movie.original_release_year
                    : 'NA'}
                </Text>

                <Text style={styles.genreText}>
                  Genre:{' '}
                  {this.movie.genres
                    ? this.movie.genres.map((genre) => {
                        return genre + ', ';
                      })
                    : 'NA'}
                </Text>
              </View>
            </View>

            <View style={styles.watchHeadingView}>
              <Text style={styles.watchHeading}> -- STREAMING IN -- </Text>
            </View>

            <View style={styles.streamingLogos}>
              {this.movie.hotstar_url !== 'NA' ? (
                <TouchableHighlight
                  onPress={() => this._onLogoPressed(this.movie.hotstar_url)}>
                  <Image
                    source={require('../Assets/logo/hotstar.png')}
                    style={styles.logoImg}
                  />
                </TouchableHighlight>
              ) : null}

              {this.movie.netflix_url !== 'NA' ? (
                <TouchableHighlight
                  onPress={() => this._onLogoPressed(this.movie.netflix_url)}>
                  <Image
                    onPress={() => this._onLogoPressed(this.movie.netflix_url)}
                    source={require('../Assets/logo/netflix.png')}
                    style={styles.logoImg}
                  />
                </TouchableHighlight>
              ) : null}

              {this.movie.prime_url !== 'NA' ? (
                <TouchableHighlight
                  onPress={() => this._onLogoPressed(this.movie.prime_url)}>
                  <Image
                    onPress={() => this._onLogoPressed(this.movie.prime_url)}
                    source={require('../Assets/logo/amazon-prime.png')}
                    style={styles.logoImg}
                  />
                </TouchableHighlight>
              ) : null}
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  mainView: {
    width: width,
    backgroundColor: Colors.white,
  },
  imageBackGround: {
    backgroundColor: Colors.background,
  },
  imgView: {
    marginTop: 10,
    marginLeft: 5,
    width: width - 10,
    height: height / 3,
    borderColor: Colors.primaryColor,
    borderTopEndRadius: 5,
    borderTopStartRadius: 5,
    borderBottomWidth: 0,
    borderWidth: 1,
  },
  movImg: {
    overflow: 'hidden',
    width: '100%',
    height: '100%',
  },
  movieName: {
    marginLeft: 5,
    marginRight: 5,
    marginTop: 10,
    backgroundColor: Colors.accentColor,
    alignItems: 'center',
  },
  movieNameText: {
    fontSize: 30,
    padding: 10,
    color: Colors.primaryColor,
    fontFamily:
      Platform.OS === 'android' ? 'sansationRegular' : 'Sansation-Regular',
  },
  ratingView: {
    marginLeft: 5,
    marginRight: 5,
    backgroundColor: Colors.accentColor,
    flexDirection: 'row',
    justifyContent: 'center',
    paddingLeft: 5,
    paddingRight: 5,
    borderBottomWidth: 1,
    borderColor: Colors.streaming,
  },
  ratingText: {
    fontSize: 15,
    width: '20%',
    margin: 5,
    padding: 10,
    backgroundColor: Colors.ratingBox,
    fontWeight: 'bold',
    borderRadius: 5,
  },
  movieSummary: {
    marginLeft: 5,
    marginRight: 5,
    padding: 10,
    backgroundColor: Colors.accentColor,
  },
  summaryText: {
    fontSize: 20,
    color: Colors.primaryColor,
  },
  genreView: {
    marginRight: 5,
    marginLeft: 5,
    paddingBottom: 10,
    width: '100%',
    flexDirection: 'row',
    backgroundColor: Colors.accentColor,
    justifyContent: 'center',
  },
  genreText: {
    width: '30%',
  },
  watchHeadingView: {
    marginLeft: 5,
    marginTop: 5,
    marginRight: 5,
    backgroundColor: Colors.streaming,
    alignItems: 'center',
  },
  watchHeading: {
    color: Colors.white,
    padding: 10,
    fontFamily:
      Platform.OS === 'android' ? 'sansationLight' : 'Sansation-Light',
  },
  streamingLogos: {
    marginLeft: 5,
    marginRight: 5,
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.accentColor,
  },
  logoImg: {
    margin: 10,
    width: 50,
    height: 50,
  },
});
