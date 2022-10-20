import {useEffect, useState} from 'react';
import React from 'react';
import { View, Image, FlatList } from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native'

import logoImg from '../../assets/logoLivreto.png'
import { GameCard, GameCardProps } from '../../components/GameCard';
import { Heading } from '../../components/Heading';
import {livros} from '../../utils/livros';
import { styles } from './styles';
import { Background } from '../../components/Background';

export function Home() {

  const [games, setGames] = useState<GameCardProps[]>([])
  const navigation = useNavigation();

  {/*function handOpenGame({id, name, bannerUrl}: GameCardProps){
    navigation.navigate('game', {id, name, bannerUrl});
  }*/}

  useEffect(() => {
    fetch('http://192.168.0.10:3333/games')
    .then(response => response.json())
    .then(data => setGames(data));
  }, [])
  
  return (
    <Background>
        <SafeAreaView style={styles.container}>
          <Image source={logoImg} style={styles.logo} />
          <Heading title="Bem vindo ao Livreto!" subtitle="Selecione o livro que deseja."/>
          
          <FlatList 
          data={livros} 
          keyExtractor={item => item.id} 
          renderItem={( {item} ) => (
            <GameCard 
              data={item}
            />
          )}
          showsHorizontalScrollIndicator={false}
          horizontal
          contentContainerStyle={styles.contentList}
          />
        </SafeAreaView>
    </Background>
    
  );
}