import React, { useState } from 'react'
import { SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import BouncyCheckbox from "react-native-bouncy-checkbox";
import * as Yup from 'yup'
import { Formik } from 'formik'

const PasswordSchema = Yup.object().shape({
  passwordLength: Yup.number()
    .min(4, 'Should be min of 4 character')
    .max(16, 'Should be max of 16 character')
    .required('length is required')
})

export default function App() {
  const [password, setPassword] = useState('')
  const [isPassGenerated, setIsPassGenerated] = useState(false)
  const [lowerCase, setLowercase] = useState(true)
  const [upperCase, setUppercase] = useState(false)
  const [number, setNumber] = useState(false)
  const [symbol, setSymbol] = useState(false)

  const generatedPasswordString = (passwordLength: number) => {
    let characterList = '';
    const upperCaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    const lowerCaseChars = 'abcdefghijklnmopqrstuvwxyz'
    const numberChars = '0123456789'
    const symbolChars = '!@#$%^&*()_+~`|}{[]:'

    if (upperCase) characterList += upperCaseChars
    if (lowerCase) characterList += lowerCaseChars
    if (number) characterList += numberChars
    if (symbol) characterList += symbolChars

    const passwordResult = createPassword(characterList, passwordLength)
    setPassword(passwordResult)
    setIsPassGenerated(true)
  }

  const createPassword = (character: string, passwordLength: number) => {
    let result = ''
    for (let i = 0; i < passwordLength; i++) {
      const characterIndex = Math.round(Math.random() * character.length);
      result += character.charAt(characterIndex)
    }
    return result
  }

  const resetPasswordState = () => {
    setPassword('')
    setIsPassGenerated(false)
    setLowercase(true)
    setUppercase(false)
    setNumber(false)
    setSymbol(false)
  }

  return (
    <ScrollView keyboardShouldPersistTaps="handled">
      <SafeAreaView style={styles.appContainer}>
        <View style={styles.formContainer}>
          <Text style={styles.title}>Password Generator</Text>
          <Formik
            initialValues={{ passwordLength: '' }}
            validationSchema={PasswordSchema}
            onSubmit={values => generatedPasswordString(+values.passwordLength)}
          >
            {({
              values,
              errors,
              touched,
              isValid,
              handleChange,
              handleSubmit,
              handleReset,
            }) => (
              <>
                <View style={styles.inputWrapper}>
                  <View style={styles.inputColumn}>
                    <Text style={styles.heading}>Password Length:</Text>
                    {touched.passwordLength && errors.passwordLength && (
                      <Text style={styles.errorText}>{errors.passwordLength}</Text>
                    )}
                  </View>
                  <TextInput
                    style={styles.inputStyle}
                    value={values.passwordLength}
                    onChangeText={handleChange('passwordLength')}
                    placeholder="write text here"
                    keyboardType='numeric'
                  />
                </View>
                <View style={styles.inputWrapper}>
                  <Text style={styles.heading}>Include Lowercase</Text>
                  <BouncyCheckbox
                    isChecked={lowerCase}
                    onPress={() => setLowercase(!lowerCase)}
                    fillColor='#29AB87'
                  />
                </View>
                <View style={styles.inputWrapper}>
                  <Text style={styles.heading}>Include Uppercase</Text>
                  <BouncyCheckbox
                    isChecked={upperCase}
                    onPress={() => setUppercase(!upperCase)}
                    fillColor='#FF19D9'
                  />
                </View>
                <View style={styles.inputWrapper}>
                  <Text style={styles.heading}>Include Number</Text>
                  <BouncyCheckbox
                    isChecked={number}
                    onPress={() => setNumber(!number)}
                    fillColor='#1940FF'
                  />
                </View>
                <View style={styles.inputWrapper}>
                  <Text style={styles.heading}>Include Symbols</Text>
                  <BouncyCheckbox
                    isChecked={symbol}
                    onPress={() => setSymbol(!symbol)}
                    fillColor='#FF1919'
                  />
                </View>

                <View style={styles.formActions}>
                  <TouchableOpacity
                    disabled={!isValid}
                    style={styles.primaryBtn}
                    onPress={()=>handleSubmit()}
                  >
                    <Text style={styles.primaryBtnTxt}>Generate Password</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.secondaryBtn}
                    onPress={() => {
                      handleReset();
                      resetPasswordState()
                    }}
                  >
                    <Text style={styles.secondaryBtnTxt}>Reset</Text>
                  </TouchableOpacity>
                </View>
              </>
            )}
          </Formik>
        </View>
        {isPassGenerated && (
          <View style={[styles.card, styles.cardElevated]}>
            <Text style={styles.subTitle}>Result:</Text>
            <Text style={styles.description}>Long Press to Copy</Text>
            <Text selectable={true} style={styles.generatedPassword}>{password}</Text>
          </View>
        )}
      </SafeAreaView>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
  },
  formContainer: {
    margin: 8,
    padding: 8,
  },
  title: {
    fontSize: 32,
    fontWeight: '600',
    marginBottom: 15,
  },
  subTitle: {
    fontSize: 26,
    fontWeight: '600',
    marginBottom: 2,
  },
  description: {
    color: '#758283',
    marginBottom: 8,
  },
  heading: {
    fontSize: 15,
  },
  inputWrapper: {
    flex:1,
    marginBottom: 15,
    alignItems: 'stretch',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  inputColumn: {
    flexDirection: 'column',
  },
  inputStyle: {
    padding: 8,
    width: '30%',
    borderWidth: 1,
    borderRadius: 4,
    borderColor: '#16213e',
  },
  errorText: {
    fontSize: 12,
    color: '#ff0d10',
  },
  formActions: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  primaryBtn: {
    width: 120,
    padding: 10,
    borderRadius: 8,
    marginHorizontal: 8,
    backgroundColor: '#5DA3FA',
  },
  primaryBtnTxt: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: '700',
  },
  secondaryBtn: {
    width: 120,
    padding: 10,
    borderRadius: 8,
    marginHorizontal: 8,
    backgroundColor: '#CAD5E2',
  },
  secondaryBtnTxt: {
    textAlign: 'center',
  },
  card: {
    padding: 12,
    borderRadius: 6,
    marginHorizontal: 12,
  },
  cardElevated: {
    backgroundColor: '#ffffff',
    elevation: 1,
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowColor: '#333',
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  generatedPassword: {
    fontSize: 22,
    textAlign: 'center',
    marginBottom: 12,
    color: '#000'
  },
})
