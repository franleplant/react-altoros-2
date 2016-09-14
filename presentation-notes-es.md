# React Altoros 2

> Practical examples of (_mostly_) real world React use cases


## Roadmap

Theory
Forms: Contolled Components
Component Life Cycle hooks
propTypes and defaultProps
Dumb and Smart Components
Router ?

Practice: Putting it all together


Bonus (if we have time): Surprise!


## Theory

### Forms: Controlled Components

- React es todo sobre uni-directional data flow
- Forms son, discutiblemente, el caso de uso canonico para el Two Way Data Binding (view <-> form data)
- Como logramos esto: Controlled Component

Ejemplo 1
```javascript
class Example extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      fields: {
        name: ''
      }
    }
  }

  handleChange(event) {
    const value = event.target.value;

    this.setState(state => {
      state.fields.name = value;
      return state;
    }):
  }


  render() {
    return (
      <form>
        <input
        type="text"
        name="name"
        value={this.state.fields.name}
        onChange={this.handleChange.bind(this)}
      />
      </form>
    );
  }
}

```


Esto es un Controlled Component.


### Component Life Cycle hooks

- Nos permiten reaccionar a eventos de la vida de un Componente de React

Listemos los mas importantes:

- componentDidMount: DOM manipulation, ajax requests
- componentWillUnmount: equivalente a `$scope.on('destroy')`, cleanup
- componentWillReceiveProps: mas que nada para componentes que tienen state, ejemplo: Edit Forms
- componentDidUpdate: DOM Manipulation (despues de cada `render` excepto el primero)

Y varios otros, pero estos son los que mas vamos a usar en los ejemplos y los que mas se suelen usar.
Mas tarde cuando hablemos de Dumb y Smart components vamos a hablar cuando y donde conviene valerse de estos hooks.



### propTypes and defaultProps

- propTypes: tipado dinamico de los props de un componente
- defaultProps: valores por defecto de una prop

Ambos dos son metodos de Clase o Estaticos.

Example 2
```javascript
class Example extends React.Component {

  render() {
    return <p>{this.props.name}, {this.props.lastName}</p>
  }

}

// TODO verify
Example.propTypes = {
  // Si falta react tira error (solo en Dev)
  name: React.PropTypes.string.isRequired,
  lastname: React.PropTypes.string
}

Example.defaultProps = {
  lastName: 'Fulano'
}


```

Beneficios:
- Mejor definicion y anotacion de la interfaz de los componentes (puede ser grande)
- Checkeo dinamico (solo en Dev)
- Bueno para Futuros-Yo





### Dumb and Smart Components

- Espectro de clasificacion de componentes

> ESPECTRO

Dumb

- function pura de props (functional components)
- no tienen estado
- son simples
- muy faciles de testear (se modelan como una funcion pura)
- renderizan en general otros dumb components (no estrictamente verdadero)
- renderizan en general "html" puro (no estrictamente verdadero)
- no utilizan life cycle hooks


 Smart
- usan `props`
- usan `state`
- Si utilizamos Flux/Redux/Etc, se conectan a los stores
- son Route Handlers (Router)
- usan life cycle hooks



NOTAS:
La realidad es que es muy dificil clasificar estrictamente todos los componentes de nuestra aplicacion.
A veces un simple Form va a tener estado pero fuera de eso va a ser un componente `Dumb`, a veces un
`Route Handler` va a ser un componente funccional puro.

En mi opinion, no nos sirve tanto clasicar en carpetas o poner distintas nomeclaturas para Dumb y Smart componentes.
La utilidad de este concepto recide en que idealmente nuestros componentes de vista, deberian ser tontos y pequenios,
pensemos en un Error Message, en un Boton, mientras que por otro lado deberiamos tener solo unos pocos componentes
Smart que van a constituir algo asi como los View "Controllers" de nuestra app. Tambien suele pasar que esos controllers
son Route Handlers.



Example 3: Functional Stateless Components
```javascript

function Example(props) {
  return <p>Hi, my name is {props.name}</p>
}
```

No puede tener estado ni escuchar a los life cycle hooks.
Si puede tener propTypes y defaultProps.





