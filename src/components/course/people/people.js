const studentList = {
    entity:[{
        userId:10,
        username:'bob',
        nickname:"Asahi"
    },
    {
        userId:12,
        username:'wev g',
        nickname:"Asahi"
    },
    {
        userId:13,
        username:'Asahiqq',
        nickname:"Asahi"
    }]
}
const groupsList = {
    entity:[
    //   {
    //     id:1,
    //     courseId:11,
    //     name:'yuwen',
    //     allowSelfSignup:1,
    //     isSectionGroup:1,
    //     isStudentGroup:0,
    //     leaderSetStrategy:1,
    //     groupMemberNumber:2,
    //     createTime:0,
    //     updateTime:0,
    // },
    // {
    //     id:2,
    //     courseId:11,
    //     name:'Student Groups',
    //     allowSelfSignup:1,
    //     isSectionGroup:1,
    //     isStudentGroup:1,
    //     leaderSetStrategy:2,
    //     groupMemberNumber:4,
    //     createTime:0,
    //     updateTime:0,
    // },
    // {
    //     id:3,
    //     courseId:11,
    //     name:'English',
    //     allowSelfSignup:0,
    //     isSectionGroup:0,
    //     isStudentGroup:0,
    //     leaderSetStrategy:3,
    //     groupMemberNumber:8,
    //     createTime:0,
    //     updateTime:0,
    // }
    ]
}
const groupList = {
    entity:[{
        id:1,
        maxMemberNumber:11,
        name:'pop',
        joinType:1,//1: 无限制 2: 仅限邀请
        memberNumber:1,
        leaderId:7,
        groupUsers:[{
            userId:7,
            isLeader:1,
            username:"live",
            nickname:"bady"
        }],
    },
    {
        id:2,
        maxMemberNumber:2,
        name:'ave',
        joinType:2,//1: 无限制 2: 仅限邀请
        memberNumber:2,
        leaderId:2,
        groupUsers:[{
            userId:1,
            isLeader:0,
            username:"mmm",
            nickname:"bady"
        },
        {
            userId:2,
            isLeader:1,
            username:"sliver",
            nickname:"bady"
        }],
    },
    {
        id:3,
        maxMemberNumber:3,
        name:'nan',
        joinType:1,//1: 无限制 2: 仅限邀请
        memberNumber:1,
        leaderId:3,
        groupUsers:[{
            userId:3,
            isLeader:1,
            username:"red",
            nickname:"bady"
        }],
    }]
}
export {studentList,groupsList,groupList}
