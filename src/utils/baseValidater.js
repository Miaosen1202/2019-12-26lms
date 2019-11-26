import i18n from "../i18n/i18n";
/* eslint-disable */
const baseValidater = {
    /**
     * 校验 包括中文字、英文字母、数字和下划线
     * 登录账号校验
     */
    validateAccount(rule, value, callback) {
        const acount = /^(?!_)(?!.*?_$)[a-zA-Z0-9_\u4e00-\u9fa5]+$/;
        if (value && !acount.test(value)) {
            callback(
                new Error(
                    i18n.t("message.validateAccount_no_specifications_tip")
                )
            );
        } else {
            callback();
        }
    },

    /**
     * 邮箱校验
     */
    emailValue(rule, value, callback) {
        const temp = /^[\w.\-]+@(?:[a-z0-9]+(?:-[a-z0-9]+)*\.)+[a-z]{2,3}$/;
        const tempOne = /^[A-Za-zd]+([-_.][A-Za-zd]+)*@([A-Za-zd]+[-.])+[A-Za-zd]{2,5}$/;
        if (value && !temp.test(value)) {
            callback(
                new Error(i18n.t("message.emailValue_no_specifications_tip"))
            );
        } else {
            callback();
        }
    },

    /**
     * 正整数校验
     */
    integerP(rule, value, callback) {
        if (value && !/^[0-9]\d*$/.test(value)) {
            callback(
                new Error(i18n.t("message.integerP_no_specifications_tip"))
            );
        } else {
            callback();
        }
    },

    /**
     * 数字 ,两位
     */
    validateTwoNum(rule, value, callback) {
        const temp = /^[1-9]{2}$/;
        if (!temp.test(value)) {
            callback(
                new Error(
                    i18n.t("message.validateTwoNum_no_specifications_tip")
                )
            );
        } else {
            callback();
        }
    },
    /**
     * 数字 ,两位1-50
     */
    validateatemptNumber(rule, value, callback) {
        const temp = /^(:?[1-9]|[1-4]\d|50)$/;
        if (!temp.test(value)) {
            callback(
                new Error(i18n.t("Please enter a positive integer of 1-50."))
            );
        } else {
            callback();
        }
    },
    /**
     * 分数校验
     */
    pointValidate(rule, value, callback) {
        const tempValue = String(value).trim();
        if (tempValue) {
            const isDigital = isNaN(Number(tempValue));
            if (!isDigital) {
                const tempNum = Number(tempValue);
                if (tempNum < 0 || tempNum > 1000) {
                    callback(
                        new Error(
                            "The value of possible points for this assignment must be  between 0 and 1000"
                        )
                    );
                } else {
                    callback();
                }
            } else {
                callback(new Error("Points possible must be a number"));
            }
        } else {
            callback(new Error("Points possible is required "));
        }
    },
    pointValidatequiz(rule, value, callback) {
        const tempValue = String(value).trim();
        if (tempValue) {
            const isDigital = isNaN(Number(tempValue));
            if (!isDigital) {
                const tempNum = Number(tempValue);
                if (tempNum < 0 || tempNum > 1000) {
                    callback(
                        new Error(
                            "The value of possible points for this quiz must be  between 0 and 1000"
                        )
                    );
                } else {
                    callback();
                }
            } else {
                callback(new Error("Points possible must be a number"));
            }
        } else {
            callback(new Error("Points possible is required "));
        }
    },
    adminSetting(rule, value, callback) {
        const tempValue = String(value).trim();
        if (tempValue) {
            const isDigital = isNaN(Number(tempValue));
            if (!isDigital) {
                const tempNum = Number(tempValue);
                if (tempNum < 0 || tempNum > 65535) {
                    callback(
                        new Error(
                            "Enter only positive integers between 0 and 65535."
                        )
                    );
                } else {
                    callback();
                }
            } else {
                callback(new Error("SMTP port must be a number"));
            }
        } else {
            callback(new Error("SMTP port is required "));
        }
    }
};
/* eslint-disable no-new*/
export default baseValidater;
