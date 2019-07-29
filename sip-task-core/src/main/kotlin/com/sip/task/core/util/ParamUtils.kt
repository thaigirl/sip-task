package com.sip.task.core.util

/**
 * @author tianhu
 * @date 2019/7/29
 */
object ParamUtils {



    fun test(a:String,b:String){
        print("接受到参数a:$a,参数b:$b")
    }


}

fun main() {
    val clazz = ParamUtils.javaClass
    val methods = ParamUtils.javaClass.methods
    val param = mutableMapOf<String,Any>()
    param["a"]="我是A"
    param["b"]="我是B"
    methods.forEach {
        if (it.name == "test"){
            val parameters = it.parameters
            val array = arrayOfNulls<Any>(parameters.size)
            print(array.size)
            for (i in 0 until parameters.size){
                val parameter = parameters[i]
                array[i] = param[parameter.name]!!
            }
            it.invoke(ParamUtils,*array)
        }

    }

}