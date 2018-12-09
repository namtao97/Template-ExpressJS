const validateParameters = (args, res) => {
    for (let i = 0; i < args.length; i++) {
        let arg = args[i]
        if (!arg) {
            res.json({
                success: false,
                message: 'ERROR: Missing Arguments/Parameters'
            })
        }
    }
}

module.exports = {
    validateParameters
}