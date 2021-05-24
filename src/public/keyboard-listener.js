export default function createKeyboardListener(document) {
    const state = {
        observers: [],
        playerId: null
    }

    function registerPlayerId(playerId) {
        state.playerId = playerId
    }

    function subscribe(observerFunction) {
        state.observers.push(observerFunction)
    }

    function unsubscribeAll() {
        state.observers = []
    }

    function notifyAll(command) {
        for (const observerFunction of state.observers) {
            observerFunction(command)
        }
    }

    document.addEventListener('keydown', handleKeydown)

    function handleKeydown(event) {
        const keyPressed = event.key

        const acceptedMoves = {
            ArrowUp: 1,
            ArrowRight: 1,
            ArrowDown: 1,
            ArrowLeft: 1
        }

        if(acceptedMoves[keyPressed]) {
            const command = {
                type: 'move-player',
                playerId: state.playerId,
                keyPressed
            }

            notifyAll(command)
        }
    }

    return {
        subscribe,
        unsubscribeAll,
        registerPlayerId
    }
}