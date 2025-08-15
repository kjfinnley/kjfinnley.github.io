const textElement = document.getElementById('text')
const optionButtonsElement = document.getElementById('options-buttons')

let state = {}

function startGame() {
    state = {}
    showTextNode(1)
}

function showTextNode(textNodeIndex) {
    const textNode = textNodes.find(textNode => textNode.id === textNodeIndex)
    textElement.innerText = textNode.text
    while (optionButtonsElement.firstChild) {
        optionButtonsElement.removeChild(optionButtonsElement.firstChild)
    }

    textNode.options.forEach(option => {
        if (showOption(option)) {
                const button = document.createElement('button')
                button.innerText = option.text
                button.classList.add('btn')
                button.addEventListener('click', () => selectOption(option))
                optionButtonsElement.appendChild(button)
        }
    })
}


function showOption(option){
    return option.requiredState == null || option.requiredState(state)
}

function selectOption(option) {
    const nextTextNodeId = option.nextText
    if (nextTextNodeId <= 0) {
        return startGame()
    }
    state = Object.assign(state, option.setState)
    showTextNode(nextTextNodeId)
}

const textNodes = [
  {
      id: 1,
      text: `You wake up on a bed of moss and pine needles, the air is cool and damp. Trees tower around you in every direction. You don't know where you are... or how you got here. Your head throbs.\n
Standing over you is a large, grey wolf with calm golden eyes. She's not growling. Instead, she sits silently, watching you. Around her neck is a worn leather collar with a name tag. The tag reads "Tala".\n
Next to you, half-buried under leaves, is a sword. Its blade glints in a shaft of morning light.\n
What do you do?`,
      options: [
          {
              text: 'Take the sword.',
              setState: { takeSword: true },
              nextText: 2
          },
          {
              text: 'Leave the sword.',
              setState: { takeSword: false },
              nextText: 3
          }
      ]
  },
  {
      id: 2,
      text: `Unsure of where you are, you decide to head east. You and Tala begin walking. After what feels like an hour of silent hiking, Tala stops suddenly. Her ears twitch. You hear it too—a low growl, deep and guttural.\n
A massive brown bear lumbers into the clearing ahead, snorting, its eyes locked on you.\n
Tala snarls and lowers herself into a defensive stance.`,
      options: [
          {
              text: 'Attack the bear.',
              requiredState: (currentState) => currentState.takeSword,
              nextText: 4
          },
          {
              text: 'Run away.',
              requiredState: (currentState) => currentState.takeSword,
              nextText: 5
          }
      ]
  },
  {
      id: 3,
      text: `Unsure of where you are, you decide to head east. You and Tala begin walking. After what feels like an hour of silent hiking, Tala stops suddenly. Her ears twitch. You hear it too—a low growl, deep and guttural.\n
A massive brown bear lumbers into the clearing ahead, snorting, its eyes locked on you.\n
Tala whimpers softly and steps back, pressing against your leg.`,
      options: [
          {
              text: 'Attack the bear.',
              requiredState: (currentState) => !currentState.takeSword,
              nextText: 6
          },
          {
              text: 'Run away.',
              requiredState: (currentState) => !currentState.takeSword,
              nextText: 7
          }
      ]
  },
  {
      id: 4,
      text: `You raise your sword and rush forward. Just as the bear rears up, Tala lunges, snapping at its side. The distraction is enough. You slide behind the bear and drive the sword deep into its back. It roars... then collapses.\n
You and Tala continue eastward, shaken but alive.`,
      options: [
          {
              text: 'Play again',
              nextText: -1
          }
      ]
  },
  {
      id: 5,
      text: `You turn to run, but the weight of the sword slows you down. The bear charges—Tala tries to bark a warning, but it's too late.\n
You feel the weight of the bear slam into you, and then… nothing.\n
You died.`,
      options: [
          {
              text: 'Restart',
              nextText: -1
          }
      ]
  },
  {
      id: 6,
      text: `You leap at the bear with nothing but your fists and courage. It isn't enough.\n
The bear swipes at you and everything goes dark.\n
You died.`,
      options: [
          {
              text: 'Restart',
              nextText: -1
          }
      ]
  },
  {
      id: 7,
      text: `You and Tala sprint through the trees. The bear gives chase for a few heartbeats, then turns back. It wasn't worth the effort.\n
You slow down, breathless. You're alive.`,
      options: [
          {
              text: 'Play again',
              nextText: -1
          }
      ]
  }
]

startGame()
