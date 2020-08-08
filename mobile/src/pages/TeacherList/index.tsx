import React, { useState } from 'react';
import { View, ScrollView, TextInput, Text } from 'react-native';
import { BorderlessButton, RectButton } from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons';
import AsyncStorage from '@react-native-community/async-storage'; 

import PageHeader from '../../components/PageHeader';
import TeacherItem, { Teacher } from '../../components/TeacherItem';

import api from '../../services/api';

import styles from './styles';

function TeacherList() {
  const [isFiltersVisible, setIsFiltersVisible] = useState(true);

  const [favorites, setFavorites] = useState<number[]>([]);

  const [teachers, setTeachers] = useState([]);

  const [subject, setSubject] = useState('');
  const [week_day, setWeekDay] = useState('');
  const [time, setTime] = useState('');

  function loadFavorites() {
    AsyncStorage.getItem('favorites').then(response => {
      if (response) {
        const favoritedTeachers = JSON.parse(response);
        const favoritedTeachersIDs = favoritedTeachers.map(
          (teacher: Teacher) => (
            teacher.id
          )
        );

        setFavorites(favoritedTeachersIDs);
      }
    });
  }

  async function handleFiltersSubmit() {
    loadFavorites();

    if (!subject || !week_day || !time) {
      return alert('Todos os campos devem ser preenchidos.');
    }

    let day = 0;

    switch (week_day.toLowerCase()) {
      case 'domingo':
        day = 0;
        break;
      case 'segunda-feira':
        day = 1;
        break;
      case 'terça-feira':
        day = 2;
        break;
      case 'quarta-feira':
        day = 3;
        break;
      case 'quinta-feira':
        day = 4;
        break;
      case 'sexta-feira':
        day = 5;
        break;
      case 'sábado':
        day = 6;
        break;
      default:
        return alert('Dia da semana inválido.')
    }

    try{
      const response = await api.get('classes', {
        params: {
          subject,
          week_day: day,
          time,
        }
      });

      setTeachers(response.data);
      setIsFiltersVisible(false);
    } catch(err) {
      alert("Não foi possível buscar os proffys.");
    }
  }

  function handleToggleFiltersVisible() {
    setIsFiltersVisible(!isFiltersVisible);
  }

  return (
    <View style={styles.container}>
      <PageHeader
        title='Proffys disponíveis'
        headerRight={(
          <BorderlessButton onPress={handleToggleFiltersVisible}>
            <Feather name='filter' size={20} color='#FFF' />
          </BorderlessButton>
        )}
      >
        {isFiltersVisible && (
          <View style={styles.searchForm}>
            <Text style={styles.label}>Matéria</Text>
            <TextInput
              style={styles.input}
              value={subject}
              onChangeText={text => setSubject(text)}
              placeholder='Qual a matéria?'
              placeholderTextColor='#C1BCCC'
            />

            <View style={styles.inputGroup}>
              <View style={styles.inputBlock}>
                <Text style={styles.label}>Dia da semana</Text>
                <TextInput
                  style={styles.input}
                  value={week_day}
                  onChangeText={text => setWeekDay(text)}
                  placeholder='Qual o dia?'
                  placeholderTextColor='#C1BCCC'
                />
              </View>

              <View style={styles.inputBlock}>
                <Text style={styles.label}>Horário</Text>
                <TextInput
                  style={styles.input}
                  value={time}
                  onChangeText={text => setTime(text)}
                  placeholder='Qual horário?'
                  placeholderTextColor='#C1BCCC'
                />
              </View>
            </View>

            <RectButton onPress={handleFiltersSubmit} style={styles.submitButton}>
              <Text style={styles.submitButtonText}>Filtrar</Text>
            </RectButton>
          </View>
        )}
      </PageHeader>

      <ScrollView
        style={styles.teacherList}
        contentContainerStyle={{
          paddingBottom: 24,
          paddingHorizontal: 16,
        }}
      >
        {teachers.map((teacher: Teacher) => (
          <TeacherItem
            key={teacher.id}
            teacher={teacher}
            favorited={favorites.includes(teacher.id)}
          />
        ))}
      </ScrollView>
    </View>
  );
}

export default TeacherList;