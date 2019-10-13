class FSM {
    /**
     * Creates new FSM instance.
     * @param config
     */
    constructor(config) {
        if (config == undefined) {
            throw Error('error!');
        }
        this.config = config;
        this.actualState = this.config.initial;
        this.nextState = '';
        this.prevState = '';

    }

    /**
     * Returns active state.
     * @returns {String}
     */
    getState() {
        return this.actualState;
    }

    /**
     * Goes to specified state.
     * @param state
     */
    changeState(state) {
        if (state in this.config.states) {
            this.prevState = this.actualState;
            this.actualState = state;
        }
        else
            throw Error ('Alarm');
    }

    /**
     * Changes state according to event transition rules.
     * @param event
     */
    trigger(event) {
        if (event in this.config.states[this.actualState].transitions) {
            this.prevState = this.actualState;
            this.actualState = this.config.states[this.actualState].transitions[event];
        }
        else
            throw Error ('Alarm');
    }

    /**
     * Resets FSM state to initial.
     */
    reset() {
        this.prevState = this.actualState;
        this.actualState = this.config.initial;
    }

    /**
     * Returns an array of states for which there are specified event transition rules.
     * Returns all states if argument is undefined.
     * @param event
     * @returns {Array}
     */
    getStates(event) {
        let arr = [];
        if (event == undefined) {
            for (let key in this.config.states) {
                arr.push(key);
            }
            return arr;
        }

        for (let key in this.config.states) {
            if (this.config.states[key].transitions[event]) {
                arr.push(key);
            }           
        }
        return arr;
    }

    /**
     * Goes back to previous state.
     * Returns false if undo is not available.
     * @returns {Boolean}
     */
    undo() {
        if (this.prevState == '') {
            return false;
        }
        else {
            this.nextState = this.actualState;
            this.actualState = this.prevState;
            this.prevState = '';
            return true;
        }
    }

    /**
     * Goes redo to state.
     * Returns false if redo is not available.
     * @returns {Boolean}
     */
    redo() {
        if (this.nextState == '') {
            return false;
        }
        else {
            this.prevState = this.actualState;
            this.actualState = this.nextState;
            this.nextState = '';
            return true;
        }
    }

    /**
     * Clears transition history
     */
    clearHistory() {
        this.prevState = '';
        this.nextState = '';
    }
}

module.exports = FSM;

/** @Created by Uladzimir Halushka **/
