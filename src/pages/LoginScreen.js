import React from 'react';
import {
    View, Text, TextInput,
    StyleSheet, Button,
    ActivityIndicator, Alert
} from 'react-native';
import FormRow from '../components/FormRow';
import firebase from '@firebase/app';
import '@firebase/auth';



export default class LoginPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            mail: '',
            password: '',
            isLoading: false,
            message: '',
        }
    }
    static navigationOptions = ({ navigation }) => {
        return {
            title: 'Bem vindo!',
        }
    }



    componentDidMount() {
        const firebaseConfig = {
            apiKey: "AIzaSyAMdB4Kp4k688q1OFmtSGDFZqbvzNAyUvw",
            authDomain: "series-f68f9.firebaseapp.com",
            databaseURL: "https://series-f68f9.firebaseio.com",
            projectId: "series-f68f9",
            storageBucket: "series-f68f9.appspot.com",
            messagingSenderId: "807219244567",
            appId: "1:807219244567:web:d86f7f06fcdc88ee"
        };
        firebase.initializeApp(firebaseConfig);

    }
    async tryLogin() {
        this.setState({ isLoading: true, message: '' });
        const { mail, password } = this.state;

        const loginUserSucess = () => {
            this.setState({message: 'Sucesso!'});
            console.log(message);
            this.props.navigation.navigate('Main');
        }

        const loginUserFailed = error => {
            this.setState({
                message: this.getMessageByErrorCode(error.code)
            });
        }

        console.log("teste2");
        try {
            const user = await firebase.auth()
            .signInWithEmailAndPassword(mail, password);
            this.setState({ isLoading: false });
            loginUserSucess;
            console.log(this.state.isLoading);
            console.log(this.state.message);
            this.props.navigation.navigate('Main', {user});
        } catch (error) {
            if (error.code === 'auth/user-not-found') {
                Alert.alert('Usuário não encontrado',
                    'Deseja criar cadastro?',
                    [{
                        text: 'Não',
                        onPress: () => console.log("Usuário nao quer"),
                        style: 'cancel'
                    },
                    {
                        text: 'Sim',
                        onPress: () => {
                            firebase
                            .auth()
                            .createUserWithEmailAndPassword(mail, password)
                            .then(loginUserSucess)
                            .catch(loginUserFailed)
                         }
                    }],
                    { cancelable: false }
                )
            }else{
                loginUserFailed;
            }
            
            
        }
        
    }

    getMessageByErrorCode(errorCode) {
        switch (errorCode) {
            case 'auth/wrong-password':
                return 'Senha incorreta';
            case 'auth/user-not-found':
                return 'Usuário não encontrado';
            default:
                return 'Erro desconhecido';

        }
    }

    onChangeHandler(field, value) {
        this.setState({
            [field]: value
        });
    }
    renderButton() {
        if (this.state.isLoading) {
            return <ActivityIndicator />
        }
        return (
            <Button title="Entrar" onPress={() => this.tryLogin()} />
        );
    }
    renderMessage() {
        const { message } = this.state;
        if (!message) {
            return null;
        }
        return (
            <View>
                <Text> {message}</Text>
            </View>
        )
    }

    render() {
        return (

            <View style={styles.container}>
                <FormRow first>
                    <TextInput style={styles.input}
                        placeholder="user@email.com"
                        value={this.state.mail}
                        onChangeText={value => this.onChangeHandler('mail', value)}
                    />
                </FormRow>

                <FormRow last>
                    <TextInput style={styles.input}
                        placeholder="******" secureTextEntry
                        value={this.state.password}
                        onChangeText={value => this.onChangeHandler('password', value)}
                    />
                </FormRow>
                {this.renderButton()}
                {this.renderMessage()}


            </View>
        )
    }
}

const styles = StyleSheet.create({

    input: {
        paddingLeft: 5,
        paddingRight: 5,
        paddingBottom: 5,
    },
    container: {
        paddingLeft: 10,
        paddingRight: 10,
    }

});